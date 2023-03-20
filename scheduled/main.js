const axios = require("axios")
const { generateDevotional } = require("./generateDevotional")

async function main() {
    try {
        console.log('callling openai')
        const text = await generateDevotional();
        console.log('calling api')
        await axios.post(`${process.env.URL}/api/devotional`, { text }, {
            headers: {
                'Authorization': `Bearer ${process.env.APP_KEY}`
            }
        });
        console.log('finished')
    } catch (ex) {
        console.error(`an error happenes ${ex.message}`)
    }


}

main();

