import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;

async function findHeroesTable() {
    console.log('Searching for "Heroes" table in all accessible docs...');
    try {
        const docsResponse = await axios.get(
            `https://coda.io/apis/v1/docs`,
            {
                headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
            }
        );

        const docs = docsResponse.data.items;
        console.log(`Checking ${docs.length} docs...`);

        for (const doc of docs) {
            console.log(`- Checking doc: ${doc.name} (${doc.id})...`);
            try {
                const tablesResponse = await axios.get(
                    `https://coda.io/apis/v1/docs/${doc.id}/tables`,
                    {
                        headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
                    }
                );
                const tables = tablesResponse.data.items;
                const heroesTable = tables.find(t => t.name.toLowerCase() === 'heroes');
                if (heroesTable) {
                    console.log(`🎯 FOUND HEROES TABLE!`);
                    console.log(`Doc Name: ${doc.name}`);
                    console.log(`Doc ID: ${doc.id}`);
                    console.log(`Table Name: ${heroesTable.name}`);
                    console.log(`Table ID: ${heroesTable.id}`);
                    return;
                }
            } catch (err) {
                console.log(`  (Could not list tables in this doc: ${err.message})`);
            }
        }
        console.log('❌ Could not find a "Heroes" table in any accessible doc.');
    } catch (error) {
        console.error('❌ Failed:', error.message);
    }
}

findHeroesTable();
