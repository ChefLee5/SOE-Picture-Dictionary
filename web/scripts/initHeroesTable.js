import axios from 'axios';

const token = '7fce9177-6720-47dc-aacf-1c25f62c9e8b';
const docId = 'rfHoJ3_U7z'; // Playground Doc

async function createHeroesTable() {
    console.log(`Creating Heroes table in Doc: ${docId}...`);
    try {
        const response = await axios.post(
            `https://coda.io/apis/v1/docs/${docId}/tables`,
            {
                table: {
                    name: 'Heroes',
                    description: 'A database of Rhythm Quest heroes synced to the website.',
                }
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const tableId = response.data.id;
        console.log(`✅ Table "Heroes" created with ID: ${tableId}`);

        // Define columns
        const columns = [
            { name: 'Name', type: 'text' },
            { name: 'Title', type: 'text' },
            { name: 'Land', type: 'text' },
            { name: 'LandColor', type: 'text' },
            { name: 'Focus', type: 'text' },
            { name: 'Bio', type: 'text' },
            { name: 'Traits', type: 'text' }, // We'll store as comma-separated
            { name: 'Status', type: 'text' }, // Pending / Synced
        ];

        console.log(`Creating ${columns.length} columns...`);
        for (const col of columns) {
            await axios.post(
                `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/columns`,
                { column: col },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(`   Added column: ${col.name}`);
        }

        console.log('🚀 Heroes table initialized successfully!');
    } catch (error) {
        console.error('❌ Error creating table:', error.response?.status, error.response?.statusText);
        if (error.response?.data) console.error(JSON.stringify(error.response.data, null, 2));
    }
}

createHeroesTable();
