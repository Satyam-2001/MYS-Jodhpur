const Message = require('./models/Message');
const Chat = require("./models/Chat");
const socketio = require("socket.io");
const { removeUserSocketByUserId, addUserSocket, getRelationBySocketId, getRelationByUserId, removeUserSocketBySocketId } = require("./utils");
const User = require("./models/User");

const { app } = require('./app')
const http = require('http');
const SocketController = require('./controller/socketController');
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', async (socket) => {

    const user_id = socket.handshake.query["user_id"];
    console.log(`User connected ${socket.id}`);
    const socketController = new SocketController(socket, io)
    if (await socketController.verify.bind(socketController)()) {
        socket.emit('verified', { message: 'success' })
        socket.on('get_chat_by_id', socketController.fetchChatById.bind(socketController))
        socket.on('get_chats', socketController.fetchChats.bind(socketController))
        socket.on('get_messages', socketController.fetchMessages.bind(socketController))
        socket.on('send_message', socketController.sendMessage.bind(socketController))
        socket.on('create_chat', socketController.createChat.bind(socketController))
        socket.on('read_chat', socketController.readChat.bind(socketController))
        socket.on('edit_message', socketController.editMessage.bind(socketController))
        socket.on('delete_chat', socketController.deleteChat.bind(socketController))
        socket.on('delete_message', socketController.deleteMessage.bind(socketController))
        socket.on('disconnect', socketController.disconnect.bind(socketController))
    }
})


// io.on('connection', (socket) => {
//     const user_id = socket.handshake.query["user_id"];
//     console.log(`User connected ${socket.id}`, user_id);

//     if (user_id) {
//         removeUserSocketByUserId(user_id)
//         addUserSocket(user_id, socket.id)
//     }

//     socket.on('get_chats', async (data, callback) => {
//         try {
//             const { userId } = data
//             await User.findByIdAndUpdate(userId, { last_seen: 'online' })
//             const chats = await Chat.fetchChatsByUserId(userId)
//             callback(chats)
//         }
//         catch (e) {
//             console.log(e)
//         }
//     })

//     socket.on('get_messages', async (data, callback) => {
//         try {
//             const { userId, skip = 0 } = data
//             const sender = getRelationBySocketId(socket.id)
//             const receiver = getRelationByUserId(userId)
//             const participants = [sender.user_id, userId]
//             const chat = await Chat.fetchChatByParticipants(participants)
//             const messages = await Message.find({ chatId: chat._id }).populate('reply').sort({ 'created_at': -1 }).skip(skip).limit(10)
//             const total = await Message.find({ chatId: chat._id }).countDocuments()

//             const message_data = {
//                 messages,
//                 total,
//             }
//             callback({ chat, message_data })
//         }
//         catch (e) {
//             console.log(e)
//         }
//     })

//     socket.on('send_message', async (data, callback) => {
//         try {
//             const { message } = data
//             const userId = message.to
//             const sender = getRelationBySocketId(socket.id)
//             const receiver = getRelationByUserId(userId)
//             const participants = [sender.user_id, userId]
//             let chat = await Chat.fetchChatByParticipants(participants)
//             let new_message = await Message.SendMessage(chat._id, message)
//             callback(chat, new_message)

//             if (receiver) {
//                 io.to(receiver.socket_id).emit("new_message", chat, new_message)
//             }
//         }
//         catch (e) {
//             console.log(e)
//         }

//     })

//     socket.on('delete_message', async (message) => {
//         try {
//             const sender = getRelationBySocketId(socket.id)
//             if (sender.user_id != message.from) return
//             const receiver = getRelationByUserId(message?.to?.toString())
//             await Message.findByIdAndDelete(message?._id)
//             socket.emit('delete_message', message)
//             if (receiver) {
//                 io.to(receiver.socket_id).emit('delete_message', message)
//             }
//         }
//         catch (e) {
//             console.log(e)
//         }
//     })

//     socket.on('read_message', async (data) => {
//         try {
//             const { messageId } = data
//             const sender = getRelationBySocketId(socket.id)
//             if (!sender) return
//             const message = await Message.SetAsRead(messageId, sender.user_id)
//             const receiver = getRelationByUserId(message?.from?.toString())
//             if (receiver) {
//                 io.to(receiver.socket_id).emit('updated_message', message)
//             }
//         }
//         catch (e) {
//             console.log(e)
//         }
//     })

//     socket.on('disconnect', async (data) => {
//         const user = getRelationBySocketId(socket.id)
//         if (!user) return
//         await User.findByIdAndUpdate(user.user_id, { last_seen: Date.now() })
//         removeUserSocketBySocketId(socket.id)
//     })

// })

module.exports = { server }