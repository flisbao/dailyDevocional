const {database} = require("@/config/firebaseConfig");
const telegram = require("@/lib/telegram_response");

export default async function handler(req, res) {
    const { APP_KEY } = process.env;
    const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

    if (ACTION_KEY !== ACTION_KEY) {
        res.status(401).send('unauthorized');
        return;
    }

    const text = req.body.text;
    const db = database();
    const subscriptionDocuments =  await db.collection('inscricoes').get();
    console.log('made call to subscriotion')
    subscriptionDocuments.forEach(async doc => {
        console.log('reading docs')
        await telegram.sendMessage(text, doc.get('chatId'))
    });
    console.log('finished')
    res.json({});
}