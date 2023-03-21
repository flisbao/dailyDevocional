import db from "@/config/firebaseConfig"
import TelegramBot from 'node-telegram-bot-api';
import { setTimeout } from 'timers/promises';
export default async function handler(req, res) {
    const { TELEGRAM_BOT } = process.env;
    const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });
    try {
        const subscriptionDocuments = await db.collection('inscricoes').get();
        const currentDevotionalDocuments = await db.collection('devotional').get();
        let devotional = '';
        currentDevotionalDocuments.forEach(doc => {
            devotional = doc.get('devotional')
        })


        subscriptionDocuments.forEach(async (doc) => {
            const response = await bot.sendMessage(doc.get('chatId'), devotional);
            console.log(response);
            await setTimeout(100);
        });
        
        console.log('finished')
        res.json({});
    } catch (ex) {
        console.error(`Error when calling ${ex.message}`)
    }
}
