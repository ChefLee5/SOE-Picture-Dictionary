import axios from 'axios';

async function testToken(token, label) {
    console.log(`Testing token (${label}): ${token}`);
    try {
        const response = await axios.get(
            `https://coda.io/apis/v1/docs`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log(`✅ Token (${label}) is VALID!`);
        console.log(`Accessible docs:`, response.data.items.length);
        response.data.items.forEach(doc => {
            console.log(`- ${doc.name} (ID: ${doc.id})`);
        });
    } catch (error) {
        console.error(`❌ Token (${label}) is INVALID:`, error.response?.status, error.response?.statusText);
    }
}

const token1 = '7fce9177-6720-47dc-aacf-1c25f62c9e8b'; // Provided by user in Step 89
const potentialToken2 = '70f40360-497f-4ac5-aa6d-92061eb421ad'; // Currently in CODA_DOC_ID

(async () => {
    await testToken(token1, 'User Provided');
    await testToken(potentialToken2, 'Potential Doc ID as Token');
})();
