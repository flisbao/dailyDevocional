import db from "./config/firebaseConfig.js"
import TelegramBot from 'node-telegram-bot-api';
import { setTimeout } from 'timers/promises';
import { generateDevotional } from "./openapi/generateDevotional.js";

async function main() {
    try {
        const { TELEGRAM_BOT } = process.env;
        const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });
        const text = await generateDevotional();
        await db.collection('devotional').add({
            devotional: text
        })
        await db.collection('devotional').doc('current').set({
            devotional: text
        })
        const subscriptionDocuments = await db.collection('inscricoes').get();
        subscriptionDocuments.forEach(async (doc) => {
            const response = await bot.sendMessage(doc.get('chatId'), text);
            console.log(response);
            await setTimeout(500);
        });
    } catch (ex) {
        console.error(`an error happenes ${ex.message}`)
    }


}

main();

