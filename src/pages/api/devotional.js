const db = require("@/config/firebaseConfig");
const telegram = require("@/lib/telegram_response");
const {generateDevotional} = require("@/lib/generateDevotional")
export default async function handler(req, res) {
    const text = await generateDevotional();
    const subscriptionDocuments =  await db.collection('inscricoes').get();
    subscriptionDocuments.array.forEach(async doc => {
        await telegram.sendMessage(text, doc.get('chatId'))
    });
    res.json({})
}