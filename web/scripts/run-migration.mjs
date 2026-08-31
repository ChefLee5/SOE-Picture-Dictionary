import fs from 'fs';
import path from 'path';

const connectionString = 'postgresql://neondb_owner:npg_ks2SarDnOB1E@ep-wandering-voice-ae85papv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function runMigration() {
  const rawSql = fs.readFileSync(path.resolve('scripts/neon-schema.sql'), 'utf8');
  console.log('🚀 Executing SQL Migration against Neon PostgreSQL database...');

  const urlObj = new URL(connectionString);
  const host = urlObj.host;
  const neonHttpEndpoint = `https://${host}/sql`;

  // Remove comment lines first
  const cleanSql = rawSql
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  // Split into clean statements
  const statements = cleanSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const sql of statements) {
    console.log(`Executing statement:\n${sql}\n`);
    const response = await fetch(neonHttpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connectionString,
      },
      body: JSON.stringify({
        query: sql,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Statement Failed:', errorText);
      process.exit(1);
    }
    console.log('✅ Statement executed successfully.');
  }

  // Verify tables exist
  const verifyRes = await fetch(neonHttpEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': connectionString,
    },
    body: JSON.stringify({
      query: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;",
    }),
  });

  const verifyData = await verifyRes.json();
  console.log('\n🎉 Migration successfully completed! Verified public tables in Neon:');
  console.table(verifyData.rows);
}

runMigration();
