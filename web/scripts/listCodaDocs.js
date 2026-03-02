import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;

async function listDocs() {
    console.log('Listing accessible Coda docs...');
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs`,
            {
                headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
            }
        );
        console.log('✅ Found', response.data.items.length, 'docs:');
        response.data.items.forEach(doc => {
            console.log(`- ${doc.name} (ID: ${doc.id})`);
        });
    } catch (error) {
        console.error('❌ Failed to list docs:', error.response?.status, error.response?.statusText);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
    }
}

listDocs();
