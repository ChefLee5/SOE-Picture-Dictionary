const FALLBACK_DB_URL = 'postgresql://neondb_owner:npg_ks2SarDnOB1E@ep-wandering-voice-ae85papv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function queryNeon(databaseUrl, sql, params = []) {
  const finalUrl = databaseUrl || FALLBACK_DB_URL;
  const urlObj = new URL(finalUrl);
  const host = urlObj.host;
  const neonHttpEndpoint = `https://${host}/sql`;

  const res = await fetch(neonHttpEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': finalUrl,
    },
    body: JSON.stringify({ query: sql, params }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database error: ${err}`);
  }
  return res.json();
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const databaseUrl = env?.NEON_DATABASE_URL || env?.DATABASE_URL || FALLBACK_DB_URL;

    const body = await request.json();

    // Extract customer and order details from Shopify payload
    const email = (body.email || body.customer?.email || '').toLowerCase().trim();
    if (!email) {
      return new Response(JSON.stringify({ success: true, message: 'No email found in payload' }), { status: 200 });
    }

    const firstName = body.customer?.first_name || body.billing_address?.first_name || '';
    const lastName = body.customer?.last_name || body.billing_address?.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim() || body.customer?.name || 'Valued Explorer';
    const phone = body.phone || body.customer?.phone || null;
    const orderTotal = parseFloat(body.total_price || body.current_total_price || '0');
    const orderNumber = body.order_number || body.name || 'Shopify Order';
    const lineItems = (body.line_items || []).map(item => item.title).join(', ');

    // 1. Upsert into crm_contacts
    const upsertSql = `
      INSERT INTO crm_contacts (email, name, first_name, last_name, phone, persona, lifecycle_stage, total_orders, total_spend, lead_score, updated_at)
      VALUES ($1, $2, $3, $4, $5, 'parent', 'customer', 1, $6, 100, CURRENT_TIMESTAMP)
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF($2, ''), crm_contacts.name),
        phone = COALESCE($5, crm_contacts.phone),
        lifecycle_stage = 'customer',
        total_orders = crm_contacts.total_orders + 1,
        total_spend = crm_contacts.total_spend + $6,
        lead_score = GREATEST(crm_contacts.lead_score, 100),
        last_active_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id;
    `;

    const contactRes = await queryNeon(databaseUrl, upsertSql, [
      email,
      fullName,
      firstName || null,
      lastName || null,
      phone,
      orderTotal,
    ]);

    const contactId = contactRes.rows[0]?.id;

    // 2. Log activity in crm_activities
    if (contactId) {
      const activitySql = `
        INSERT INTO crm_activities (contact_id, activity_type, title, description, metadata)
        VALUES ($1, 'shopify_order', $2, $3, $4);
      `;

      await queryNeon(databaseUrl, activitySql, [
        contactId,
        `Shopify Order #${orderNumber} ($${orderTotal.toFixed(2)})`,
        `Purchased: ${lineItems || 'SOE Product'}`,
        JSON.stringify({
          order_id: body.id,
          order_number: orderNumber,
          total_price: orderTotal,
          currency: body.currency || 'USD',
          financial_status: body.financial_status,
          line_items: body.line_items,
        }),
      ]);
    }

    return new Response(JSON.stringify({ success: true, contactId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Shopify Webhook Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
