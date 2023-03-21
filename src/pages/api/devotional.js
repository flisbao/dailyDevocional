import db from "@/config/firebaseConfig"
import TelegramBot from 'node-telegram-bot-api';
import {setTimeout} from 'timers/promises';

export default async function handler(req, res) {
    const { APP_KEY, TELEGRAM_BOT } = process.env;

    const auth = req.headers.auth.split(" ")[1];

    const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });

    if (auth !== APP_KEY) {
        res.status(401).send('unauthorized');
        return;
    }
    

    if (req.method === 'POST') {
        try {
            const text = req.body.text;
            await db.collection('devotional').doc('current').set({
                devotional: text
            })
            
            res.json({});
        } catch (ex) {
            console.error(`Error when calling ${ex.message}`)
        }
    }
}