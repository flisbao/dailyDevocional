export function extractMessage(data) {
    const { first_name, last_name, username } = data.message.from
    return {
        user: {
            firstName: first_name,
            lastName: last_name,
            username: username
        },
        message: data.message.text,
        chatId: data.message.chat.id
    }
}