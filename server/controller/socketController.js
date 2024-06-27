const { ReadChat, DeleteChat, ActiveParticpantByChatId } = require("./chatController")
const { CreateMessage, DeleteMessage, EditMessage } = require("./messageController")
const { addUserSocket, removeUserSocketBySocketId } = require("./socketUtils")

class SocketController {

    constructor(socket) {
        this.socket = socket
        this.user_id = socket.handshake.query["user_id"]
        this.connect()
    }

    connect() {
        addUserSocket(this.user_id, this.socket.id)
    }

    async sendMessage(message, callback) {
        try {
            const new_message = await CreateMessage(this.user_id, message)
            const participants = await ActiveParticpantByChatId(new_message.chatId)
            for (const participant of participants) {
                if (participant.user_id === user_id) continue
                io.to(participant.socket_id).emit("new_message", new_message)
            }
            callback(new_message)
        }
        catch (e) {
            callback(undefined, e)
        }
    }

    async createChat(chat, callback) {
        
    }

    async editMessage(message, callback) {
        try {
            const new_message = await EditMessage(this.user_id, message)
            const participants = await ActiveParticpantByChatId(new_message.chatId)
            for (const participant of participants) {
                if (participant.user_id === user_id) continue
                io.to(participant.socket_id).emit("edit_message", new_message)
            }
            callback(new_message)
        }
        catch (e) {
            callback(undefined, e)
        }
    }

    async readChat(chat_id, callback) {
        try {
            const result = await ReadChat(this.user_id, chat_id)
            callback(result)
        }
        catch (e) {
            callback(undefined, e)
        }
    }

    async deleteMessage(message_id, callback) {
        try {
            const message = await DeleteMessage(this.user_id, message_id)
            const participants = await ActiveParticpantByChatId(message.chatId)
            for (const participant of participants) {
                io.to(participant.socket_id).emit("delete_message", message)
            }
            callback(message)
        }
        catch (e) {
            callback(undefined, e)
        }
    }

    async deleteChat(chat_id, callback) {
        try {
            const chat = await DeleteChat(this.user_id, chat_id)
            const participants = await ActiveParticpantByChatId(message.chatId)
            for (const participant of participants) {
                io.to(participant.socket_id).emit("delete_chat", chat_id)
            }
            callback(chat)
        }
        catch (e) {
            callback(undefined, e)
        }
    }

    disconnect() {
        removeUserSocketBySocketId(this.socket.id)
    }
}

module.exports = SocketController