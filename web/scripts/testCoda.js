import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
const CODA_DOC_ID = process.env.CODA_DOC_ID;

async function testConnection() {
    console.log('Testing Coda connection...');
    console.log('Token length:', CODA_API_TOKEN?.length);
    console.log('Doc ID:', CODA_DOC_ID);

    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs/${CODA_DOC_ID}`,
            {
                headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
            }
        );
        console.log('✅ Connection successful!');
        console.log('Doc Title:', response.data.name);
    } catch (error) {
        console.error('❌ Connection failed:', error.response?.status, error.response?.statusText);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
    }
}

testConnection();
