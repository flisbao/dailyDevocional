import { extractMessage } from '@/domain/user';
import db from "@/config/firebaseConfig"
import TelegramBot from 'node-telegram-bot-api';

export default async function handler(req, res) {
  const { TELEGRAM_BOT } = process.env;
  const bot = new TelegramBot(TELEGRAM_BOT, { polling: false });

  try {
    const data = extractMessage(req.body);
    console.log(JSON.stringify(data));

    if (data.message.toLowerCase().startsWith('/start')) {
      await bot.sendMessage(data.chatId, "Olá, obrigado por me adicionar no seu telegram. \n O objetivo desse bot é te trazer devocionais diariamente. \n Para começar a receber os devocionais por favor escreva a palavra \"inscrever\" e depois diariamente você irá receber um novo devocional.")
      res.json({})
      return;
    }

    if (data.message.toLowerCase().startsWith('inscrever')) {

      const docs = await db.collection("inscricoes").where("chatId", "==", data.chatId).get();

      if (docs.empty) {
        await db.collection("inscricoes").add({
          user: { ...data.user },
          chatId: data.chatId
        })
        await bot.sendMessage(data.chatId, "usuário subscrito")
      } else {
        await bot.sendMessage(data.chatId, "usuário já existente")
      }

      const devotionalSnapshot = await db.collection('devotional').doc("current").get();

      await bot.sendMessage(data.chatId, "Segue abaixo o último devocional")
      await bot.sendMessage(data.chatId, devotionalSnapshot.data().devotional);


      res.json({})
      return;
    }
    await bot.sendMessage(data.chatId, "comando não encontrado");
    res.json({})

  } catch (exception) {
    console.error(ex.message)
    await bot.sendMessage(data.chatId, "um erro ocorreu, estamos tratando");
    res.status(500).send('An error happened')
  }
}
