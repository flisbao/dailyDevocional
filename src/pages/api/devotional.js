const {database} = require("@/config/firebaseConfig");
const telegram = require("@/lib/telegram_response");
const {generateDevotional} = require("@/lib/generateDevotional")
export default async function handler(req, res) {
    console.log('called')
    const text = await generateDevotional();
    console.log('got text ', text)
    const db = database();
    const subscriptionDocuments =  await db.collection('inscricoes').get();
    console.log('made call to subscriotion')
    subscriptionDocuments.forEach(async doc => {
        console.log('reading docs')
        await telegram.sendMessage(text, doc.get('chatId'))
    });
    console.log('finished')
    res.json({})
}