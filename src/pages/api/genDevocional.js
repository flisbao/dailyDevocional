import {extractMessage} from '@/domain/user';
import db from "@/config/firebaseConfig"
import TelegramBot from 'node-telegram-bot-api';

export default async function handler(req, res) {

    const data = extractMessage(req.body);
    console.log(JSON.stringify(data));
    const { TELEGRAM_BOT } = process.env;
    const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });

    if (data.message.toLowerCase().startsWith('inscrever')) {
      
      await db.collection("inscricoes").add({
        user: { ...data.user },
        chatId: data.chatId
      })

      await bot.sendMessage(data.chatId, "usuário subscrito")
      res.json({})
      return;
    }
    await bot.sendMessage(data.chatId, "comando não encontrado");
    res.json({})
}
