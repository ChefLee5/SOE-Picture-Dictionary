import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
const DOC_ID = 'Q5io_RY7pX';

async function dumpDoc() {
    console.log(`Dumping info for Doc: ${DOC_ID}...`);
    try {
        const tablesResponse = await axios.get(
            `https://coda.io/apis/v1/docs/${DOC_ID}/tables`,
            { headers: { Authorization: `Bearer ${CODA_API_TOKEN}` } }
        );

        console.log(`✅ Found ${tablesResponse.data.items.length} tables.`);
        for (const table of tablesResponse.data.items) {
            console.log(`--- Table: ${table.name} (ID: ${table.id}) ---`);
            const rowsResponse = await axios.get(
                `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${table.id}/rows`,
                { headers: { Authorization: `Bearer ${CODA_API_TOKEN}` } }
            );
            console.log(`   Rows: ${rowsResponse.data.items.length}`);
            if (rowsResponse.data.items.length > 0) {
                console.log(`   Sample Data:`, JSON.stringify(rowsResponse.data.items[0].values, null, 2));
            }
        }
    } catch (error) {
        console.error('❌ Error dumping doc:', error.response?.status, error.response?.statusText);
        if (error.response?.data) console.error(JSON.stringify(error.response.data, null, 2));
    }
}

dumpDoc();
