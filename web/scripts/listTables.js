import axios from 'axios';

const token = '7fce9177-6720-47dc-aacf-1c25f62c9e8b';
const docId = 'Q5io_RY7pX';

async function listTables() {
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs/${docId}/tables`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log(`Found ${response.data.items.length} tables:`);
        response.data.items.forEach(table => {
            console.log(`- ${table.name} (ID: ${table.id})`);
        });
    } catch (error) {
        console.error(`Error listing tables:`, error.response?.status, error.response?.statusText);
    }
}

listTables();
