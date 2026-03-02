import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
const DISCOVERED_DOC_ID = 'Q5io_RY7pX';

async function listPages() {
    console.log(`Listing pages in doc ${DISCOVERED_DOC_ID}...`);
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs/${DISCOVERED_DOC_ID}/pages`,
            {
                headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
            }
        );
        console.log('✅ Found', response.data.items.length, 'pages:');
        response.data.items.forEach(page => {
            console.log(`- ${page.name} (ID: ${page.id})`);
        });
    } catch (error) {
        console.error('❌ Failed to list pages:', error.response?.status, error.response?.statusText);
    }
}

listPages();
