import axios from 'axios';

const token = '7fce9177-6720-47dc-aacf-1c25f62c9e8b';
const docId = 'Q5io_RY7pX';

async function dumpDoc() {
    console.log(`Dumping info for Doc: ${docId}...`);
    try {
        const tablesResponse = await axios.get(
            `https://coda.io/apis/v1/docs/${docId}/tables`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(`✅ Found ${tablesResponse.data.items.length} tables.`);
        for (const table of tablesResponse.data.items) {
            console.log(`--- Table: ${table.name} (ID: ${table.id}) ---`);
            const rowsResponse = await axios.get(
                `https://coda.io/apis/v1/docs/${docId}/tables/${table.id}/rows`,
                { headers: { Authorization: `Bearer ${token}` } }
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
