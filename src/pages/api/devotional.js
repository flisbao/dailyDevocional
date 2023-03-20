const { database } = require("@/config/firebaseConfig");
const TelegramBot = require('node-telegram-bot-api');

export default async function handler(req, res) {
    const { APP_KEY, TELEGRAM_BOT } = process.env;
    const { ACTION_KEY } = req.headers.authorization.split(" ")[1];

    const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });

    if (ACTION_KEY !== APP_KEY) {
        res.status(401).send('unauthorized');
        return;
    }

    try {
        const text = req.body.text;
        const db = database();
        const subscriptionDocuments = await db.collection('inscricoes').get();
        console.log('made call to subscriotion')
        subscriptionDocuments.forEach(async doc => {
            console.log('reading docs', JSON.stringify(doc.data()))
            console.log('text => ', text)
            await bot.sendMessage(doc.get('chatId'), text)
        });
        console.log('finished')
        res.json({});
    } catch (ex) {
        console.error(`Error when calling ${ex.message}`)
    }
}