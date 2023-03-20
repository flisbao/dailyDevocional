const { database } = require("@/config/firebaseConfig");
const TelegramBot = require('node-telegram-bot-api');
const setTimeoutP = require('timers/promises').setTimeout;

export default async function handler(req, res) {
    const { APP_KEY, TELEGRAM_BOT } = process.env;

    console.log(JSON.stringify(req.headers.auth))

    const auth = req.headers.auth.split(" ")[1];

    const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });

    if (auth !== APP_KEY) {
        res.status(401).send('unauthorized');
        return;
    }

    try {
        const text = req.body.text;
        const db = database();
        const subscriptionDocuments = await db.collection('inscricoes').get();
        console.log('made call to subscriotion')
        subscriptionDocuments.forEach(async doc => {
            const response = await bot.sendMessage(doc.get('chatId'), text)
            console.log(response)
            await setTimeoutP(500)
            console.log(response.status)
        });
        console.log('finished')
        res.json({});
    } catch (ex) {
        console.error(`Error when calling ${ex.message}`)
    }
}