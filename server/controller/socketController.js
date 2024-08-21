const { verifyToken } = require("../middleware/auth")
const User = require("../models/User")
const { ReadChat, DeleteChat, ActiveParticpantByChatId, CreateChat, FetchChatByParticipants, FetchChatById } = require("./chatController")
const { CreateMessage, DeleteMessage, EditMessage, FetchMessagesByChatId } = require("./messageController")
const { addUserSocket, removeUserSocketBySocketId } = require("./socketUtils")

class SocketController {

    constructor(socket, io) {
        this.io = io
        this.socket = socket
    }

    connect() {
        addUserSocket(this.user._id.toString(), this.socket.id)
    }

    async verify() {
        try {
            const token = this.socket.handshake.query["token"];
            const data = await verifyToken(token)
            this.user = data.user
            const res = await User.findByIdAndUpdate(this.user._id, { status: 'online', last_seen: Date.now() })
            this.connect()
            return true
        }
        catch (e) {
            return false
        }
    }

    async fetchChatById(data, callback) {
        try {
            const chats = await FetchChatById(data, this.user)
            callback(chats)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async fetchChats(data, callback) {
        try {
            const chats = await FetchChats(this.user)
            callback(chats)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async fetchMessages(data, callback) {
        try {
            const { userId, skip = 0 } = data
            const chat = await FetchChatByParticipants([this.user._id.toString(), userId])
            await this.readChat(chat._id, () => { })
            const result = await FetchMessagesByChatId(chat._id, { skip, limit: 10 })
            callback({ chat, ...result })
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async sendMessage(message, callback) {
        try {
            const new_message = await CreateMessage(this.user._id, message)
            const participants = await ActiveParticpantByChatId(new_message.chatId)
            for (const participant of participants) {
                if (participant.user_id === this.user._id.toString()) continue
                this.io.to(participant.socket_id).emit("new_message", new_message)
            }
            callback(new_message)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async createChat(chat, callback) {
        try {
            const new_chat = await CreateChat(chat)
            callback(new_chat)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async editMessage(message, callback) {
        try {
            const new_message = await EditMessage(this.user._id, message)
            const participants = await ActiveParticpantByChatId(new_message.chatId)
            for (const participant of participants) {
                if (participant.user_id === this.user._id.toString()) continue
                this.io.to(participant.socket_id).emit("edit_message", new_message)
            }
            callback(new_message)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async readChat(chat_id, callback) {
        try {
            const result = await ReadChat(this.user._id.toString(), chat_id)
            const participants = await ActiveParticpantByChatId(chat_id)
            for (const participant of participants) {
                if (participant.user_id === this.user._id.toString()) continue
                this.io.to(participant.socket_id).emit("read_chat", this.user._id.toString(), chat_id)
            }
            callback(result)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async deleteMessage(message_id, callback = () => { }) {
        try {
            const message = await DeleteMessage(this.user._id.toString(), message_id)
            const participants = await ActiveParticpantByChatId(message.chatId)
            for (const participant of participants) {
                this.io.to(participant.socket_id).emit("delete_message", message)
            }
            callback(message)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async deleteChat(chat_id, callback) {
        try {
            const participants = await ActiveParticpantByChatId(chat_id)
            const chat = await DeleteChat(this.user._id.toString(), chat_id)
            for (const participant of participants) {
                this.io.to(participant.socket_id).emit("delete_chat", chat_id)
            }
            callback(chat)
        }
        catch (e) {
            callback?.(undefined, e)
        }
    }

    async disconnect() {
        if (!this.socket?.id) return
        removeUserSocketBySocketId(this.socket.id)
        if (!this.user?._id) return
        try {
            await User.findByIdAndUpdate(this.user._id, { status: 'offline', last_seen: Date.now() })
        }
        catch (e) { }
    }
}

module.exports = SocketController