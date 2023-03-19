const {extractMessage} = require('@/domain/user');
const db = require("@/config/firebaseConfig");
const telegram = require("@/lib/telegram_response");

export default async function handler(req, res) {

    const data = extractMessage(req.body);

    if (data.message.startsWith('inscrever')) {
      await db.collection("inscricoes").add({
        user: data.user,
        chatId: data.chatId
      })

      await telegram.sendMessage("usuario cadastrado", data.chatId)
      res.json({})
      return;
    }

    await telegram.sendMessage("comando não encontrado", data.chatId)
    res.json({})
}
