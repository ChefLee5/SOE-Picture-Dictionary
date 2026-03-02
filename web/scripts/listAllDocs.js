import axios from 'axios';

const token = '7fce9177-6720-47dc-aacf-1c25f62c9e8b';

async function listAllDocs() {
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`Found ${response.data.items.length} docs:`);
        response.data.items.forEach(doc => {
            console.log(`- ${doc.name} (ID: ${doc.id})`);
        });
    } catch (error) {
        console.error(`Error listing docs:`, error.response?.status, error.response?.statusText);
    }
}

listAllDocs();
