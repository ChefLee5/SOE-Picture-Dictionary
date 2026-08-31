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

export async function onRequestGet(context) {
  try {
    const { env } = context;
    const databaseUrl = env?.NEON_DATABASE_URL || env?.DATABASE_URL || FALLBACK_DB_URL;

    // Run parallel metric queries
    const [
      totalContactsRes,
      totalSpendRes,
      pipelineValueRes,
      personasRes,
      stagesRes,
      dealsRes,
      recentLeadsRes
    ] = await Promise.all([
      queryNeon(databaseUrl, "SELECT COUNT(*) as count FROM crm_contacts;"),
      queryNeon(databaseUrl, "SELECT COALESCE(SUM(total_spend), 0) as total_ltv FROM crm_contacts;"),
      queryNeon(databaseUrl, "SELECT COALESCE(SUM(deal_value), 0) as pipeline_value FROM crm_deals WHERE stage NOT IN ('closed_lost', 'closed_won');"),
      queryNeon(databaseUrl, "SELECT persona, COUNT(*) as count FROM crm_contacts GROUP BY persona;"),
      queryNeon(databaseUrl, "SELECT lifecycle_stage, COUNT(*) as count FROM crm_contacts GROUP BY lifecycle_stage;"),
      queryNeon(databaseUrl, "SELECT stage, COUNT(*) as count, COALESCE(SUM(deal_value), 0) as value FROM crm_deals GROUP BY stage;"),
      queryNeon(databaseUrl, "SELECT COUNT(*) as count FROM crm_contacts WHERE created_at >= NOW() - INTERVAL '30 days';"),
    ]);

    const stats = {
      totalContacts: parseInt(totalContactsRes.rows[0]?.count || '0', 10),
      totalLtv: parseFloat(totalSpendRes.rows[0]?.total_ltv || '0'),
      activePipelineValue: parseFloat(pipelineValueRes.rows[0]?.pipeline_value || '0'),
      last30DaysNewLeads: parseInt(recentLeadsRes.rows[0]?.count || '0', 10),
      personas: personasRes.rows,
      lifecycleStages: stagesRes.rows,
      dealsByStage: dealsRes.rows,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
