import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CODA_TOKEN = '7fce9177-6720-47dc-aacf-1c25f62c9e8b';
const DOC_ID = 'rfHoJ3_U7z';
const TABLE_NAME = 'Heroes';

async function syncHeroCoda() {
    console.log('🚀 Starting Hero Coda Sync...');

    try {
        // 1. Find the Heroes table ID
        const tablesResponse = await axios.get(
            `https://coda.io/apis/v1/docs/${DOC_ID}/tables`,
            { headers: { Authorization: `Bearer ${CODA_TOKEN}` } }
        );

        const heroesTable = tablesResponse.data.items.find(t => t.name === TABLE_NAME);
        if (!heroesTable) {
            console.error(`❌ Table "${TABLE_NAME}" not found in doc ${DOC_ID}.`);
            return;
        }
        const tableId = heroesTable.id;

        // 2. Fetch rows
        // Note: Filters can be tricky in API, we'll fetch all and filter in JS for robustness
        const rowsResponse = await axios.get(
            `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${tableId}/rows`,
            { headers: { Authorization: `Bearer ${CODA_TOKEN}` } }
        );

        const allRows = rowsResponse.data.items;
        const pendingRows = allRows.filter(row => row.values.Status === 'Pending');

        console.log(`📦 Found ${pendingRows.length} pending heroes.`);

        const heroesJsonPath = path.resolve(__dirname, '../src/data/heroes.json');
        let currentHeroes = JSON.parse(fs.readFileSync(heroesJsonPath, 'utf8'));

        for (const row of pendingRows) {
            const vals = row.values;
            const name = vals.Name;

            console.log(`✨ Processing ${name}...`);

            const newHero = {
                name: name,
                title: vals.Title || 'UGC Hero',
                land: vals.Land,
                landColor: vals.LandColor || '#d4a843',
                focus: vals.Focus || 'Learning Guide',
                img: `/assets/heroes/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                bio: vals.Bio,
                traits: vals.Traits ? vals.Traits.split(',').map(t => t.trim()) : [],
            };

            currentHeroes.push(newHero);

            // 3. Update Status in Coda to "Synced"
            await axios.put(
                `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${tableId}/rows/${row.id}`,
                {
                    row: {
                        cells: [{ column: 'Status', value: 'Synced' }]
                    }
                },
                { headers: { Authorization: `Bearer ${CODA_TOKEN}` } }
            );

            console.log(`✅ ${name} marked as Synced in Coda!`);
        }

        fs.writeFileSync(heroesJsonPath, JSON.stringify(currentHeroes, null, 4));
        console.log('🏆 All heroes synced and heroes.json updated.');

    } catch (error) {
        console.error('❌ Sync failed:', error.response?.status, error.response?.statusText);
        if (error.response?.data) console.log(JSON.stringify(error.response.data, null, 2));
    }
}

syncHeroCoda();
