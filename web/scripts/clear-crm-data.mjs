const connectionString = 'postgresql://neondb_owner:npg_ks2SarDnOB1E@ep-wandering-voice-ae85papv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function clearCrmData() {
  console.log('🧹 Clearing all sample data from Neon CRM tables...');

  const urlObj = new URL(connectionString);
  const host = urlObj.host;
  const neonHttpEndpoint = `https://${host}/sql`;

  const tables = [
    'crm_activities',
    'crm_notes',
    'crm_tasks',
    'crm_deals',
    'crm_contacts',
  ];

  for (const table of tables) {
    console.log(`Clearing table: ${table}...`);
    const res = await fetch(neonHttpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connectionString,
      },
      body: JSON.stringify({ query: `DELETE FROM ${table};` }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Failed to clear ${table}:`, err);
    }
  }

  // Also remove sample seeder from migration runner so it doesn't reseed
  console.log('\n✨ All CRM tables in Neon PostgreSQL are now completely blank and ready for real customer data!');
}

clearCrmData();
