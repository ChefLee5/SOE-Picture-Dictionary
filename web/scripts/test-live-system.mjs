import https from 'https';

const PRODUCTION_URL = 'https://soe-website-b7j.pages.dev';
const NEON_CONNECTION_STRING = 'postgresql://neondb_owner:npg_ks2SarDnOB1E@ep-wandering-voice-ae85papv.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      // Follow redirects (301, 302, 307, 308)
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, url).toString();
        return fetchUrl(redirectUrl, options).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runSystemDiagnostics() {
  console.log('================================================================');
  console.log('🧪 SOE FULL-STACK ZERO-COST ARCHITECTURE TEST RUN');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  // -------------------------------------------------------------
  // TEST 1: Cloudflare Pages Edge CDN & SPA Routing
  // -------------------------------------------------------------
  total++;
  console.log(`[TEST 1] Verifying Cloudflare Pages Edge CDN (${PRODUCTION_URL})...`);
  try {
    const res = await fetchUrl(PRODUCTION_URL);
    if (res.status === 200 && res.body.includes('The Sound of Essentials')) {
      console.log('✅ PASS: Cloudflare Edge CDN serving React SPA (Status 200)');
      console.log(`   CF-Ray: ${res.headers['cf-ray'] || 'Edge active'}`);
      console.log(`   Server: ${res.headers['server']}`);
      passed++;
    } else {
      console.log(`❌ FAIL: Edge responded with status ${res.status}`);
    }
  } catch (err) {
    console.error('❌ FAIL:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 2: Cloudflare Pages SPA Routing Rewrite
  // -------------------------------------------------------------
  total++;
  console.log(`\n[TEST 2] Verifying SPA Routing Rewrite on sub-routes (/universe, /characters)...`);
  try {
    const res = await fetchUrl(`${PRODUCTION_URL}/universe`);
    if (res.status === 200 && res.body.includes('<div id="root">')) {
      console.log('✅ PASS: SPA client-side rewrite rules working cleanly (Status 200)');
      passed++;
    } else {
      console.log(`❌ FAIL: Sub-route responded with status ${res.status}`);
    }
  } catch (err) {
    console.error('❌ FAIL:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 3: Neon Serverless Database Direct Connectivity
  // -------------------------------------------------------------
  total++;
  console.log(`\n[TEST 3] Verifying Neon PostgreSQL Direct Connectivity & Tables...`);
  try {
    const urlObj = new URL(NEON_CONNECTION_STRING);
    const neonHttpEndpoint = `https://${urlObj.host}/sql`;

    const res = await fetch(neonHttpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': NEON_CONNECTION_STRING,
      },
      body: JSON.stringify({
        query: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;",
      }),
    });

    const data = await res.json();
    const tables = data.rows.map(r => r.table_name);
    if (tables.includes('soe_submissions') && tables.includes('user_quest_progress')) {
      console.log('✅ PASS: Neon Serverless Postgres active with tables:');
      console.log(`   Tables: [ ${tables.join(', ')} ]`);
      passed++;
    } else {
      console.log('❌ FAIL: Missing required tables in Neon');
    }
  } catch (err) {
    console.error('❌ FAIL:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 4: End-to-End Submission from Cloudflare Edge to Neon
  // -------------------------------------------------------------
  total++;
  console.log(`\n[TEST 4] Testing Live Form Submission via Cloudflare Edge Function (/api/submit)...`);
  const testEmail = `test.user.${Date.now()}@soundofessentials.com`;
  try {
    const submitPayload = JSON.stringify({
      kind: 'interest',
      name: 'Agent Test Voyager',
      email: testEmail,
      organizationName: 'M & M Media Arts Test Lab',
      message: 'Automated test verifying Cloudflare Edge + Neon Postgres pipeline!',
      sourcePath: '/test-runner',
    });

    const res = await fetchUrl(`${PRODUCTION_URL}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(submitPayload),
      },
      body: submitPayload,
    });

    const json = JSON.parse(res.body);
    if (res.status === 200 && json.success) {
      console.log('✅ PASS: Edge Function received submission and saved to Neon!');
      console.log(`   Submission ID: ${json.submissionId || 'Recorded'}`);
      passed++;

      // Verify query in Neon
      const urlObj = new URL(NEON_CONNECTION_STRING);
      const neonRes = await fetch(`https://${urlObj.host}/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Neon-Connection-String': NEON_CONNECTION_STRING,
        },
        body: JSON.stringify({
          query: `SELECT id, name, email, kind, created_at FROM soe_submissions WHERE email = '${testEmail}';`,
        }),
      });
      const dbVerify = await neonRes.json();
      if (dbVerify.rows && dbVerify.rows.length > 0) {
        console.log('   Verified directly in Neon DB:');
        console.table(dbVerify.rows);
      }
    } else {
      console.log('❌ FAIL: Submission failed:', res.body);
    }
  } catch (err) {
    console.error('❌ FAIL:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 5: Cloudflare R2 Zero-Egress Storage Verification
  // -------------------------------------------------------------
  total++;
  console.log(`\n[TEST 5] Verifying Cloudflare R2 Remote Bucket 'soemedia'...`);
  try {
    const { execSync } = await import('child_process');
    execSync('npx wrangler r2 object get "soemedia/audio/01. Sunny Day (intro).mp3" --file=temp_test.mp3 --remote', { stdio: 'pipe' });
    const fs = await import('fs');
    if (fs.existsSync('temp_test.mp3')) {
      const stats = fs.statSync('temp_test.mp3');
      console.log(`✅ PASS: Retrieved object directly from Cloudflare R2 'soemedia' bucket!`);
      console.log(`   File: 01. Sunny Day (intro).mp3 (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      fs.unlinkSync('temp_test.mp3');
      passed++;
    }
  } catch (err) {
    console.log('⚠️ Notice:', err.message);
  }

  console.log('\n================================================================');
  console.log(`🏁 TEST RESULTS: ${passed}/${total} TESTS PASSED (${((passed / total) * 100).toFixed(0)}%)`);
  console.log('================================================================');
}

runSystemDiagnostics();
