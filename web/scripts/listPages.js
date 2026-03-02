import axios from 'axios';

const token = '7fce9177-6720-47dc-aacf-1c25f62c9e8b';
const docId = 'rfHoJ3_U7z';

async function listPages() {
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs/${docId}/pages`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log(`Found ${response.data.items.length} pages:`);
        response.data.items.forEach(page => {
            console.log(`- ${page.name} (ID: ${page.id})`);
        });
    } catch (error) {
        console.error(`Error listing pages:`, error.response?.status, error.response?.statusText);
    }
}

listPages();
