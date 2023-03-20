const axios = require("axios")
const { generateDevotional } = require("./generateDevotional")

async function main() {
    try {
        const text = await generateDevotional();
        console.log('calling api', text)
        await axios.post(`${process.env.URL}/api/devotional`, { text }, {
            headers: {
                'auth': `Bearer ${process.env.APP_KEY}`
            }
        });
        console.log('finished')
    } catch (ex) {
        console.error(`an error happenes ${ex.message}`)
    }


}

main();

