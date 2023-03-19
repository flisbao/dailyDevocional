const axios = require("axios");

export async function sendMessage(message, chatId) {
    if (process.env.NODE_ENV === 'development') {
        console.log(message)
        return;
    }
    const telegrambot = process.env.TELEGRAM_BOT;

    await axios.get(`https://api.telegram.org/bot${telegrambot}/sendMessage?chat_id=${chatId}&text=${message}`)
}