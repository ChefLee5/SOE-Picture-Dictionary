import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
const DISCOVERED_DOC_ID = 'Q5io_RY7pX';

async function listTables() {
    console.log(`Listing tables in doc ${DISCOVERED_DOC_ID}...`);
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs/${DISCOVERED_DOC_ID}/tables`,
            {
                headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
            }
        );
        console.log('✅ Found', response.data.items.length, 'tables:');
        response.data.items.forEach(table => {
            console.log(`- ${table.name} (ID: ${table.id})`);
        });
    } catch (error) {
        console.error('❌ Failed to list tables:', error.response?.status, error.response?.statusText);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
    }
}

listTables();
