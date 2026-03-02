import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
const DISCOVERED_DOC_ID = 'Q5io_RY7pX';
const CODA_TABLE_ID = 'Heroes';

async function checkTable() {
    console.log(`Checking rows for table "${CODA_TABLE_ID}" in doc ${DISCOVERED_DOC_ID}...`);
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs/${DISCOVERED_DOC_ID}/tables/${CODA_TABLE_ID}/rows`,
            {
                headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
            }
        );
        console.log('✅ Found table! Rows count:', response.data.items.length);
    } catch (error) {
        console.error('❌ Table not found or error:', error.response?.status, error.response?.statusText);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
    }
}

checkTable();
