const axios = require("axios")
const { generateDevotional } = require("./generateDevotional")

async function main() {
    try {
        const text = await generateDevotional();
        await axios.post(`${process.env.URL}/api/devotional`, { text }, {
            headers: {
                'Authorization': `Bearer ${process.env.APP_KEY}`
            }
        });
    } catch (ex) {
        console.error(`an error happenes ${ex.message}`)
    }


}

main();

