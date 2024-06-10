require("./db/mongoose")
const express = require("express")
const cors = require('cors');
const authRouter = require("./routers/auth")
const userRouter = require("./routers/user")
const activityRouter = require("./routers/activity")
// const Message = require('./models/Message');
// const Chat = require("./models/Chat");
// const { default: mongoose } = require("mongoose");

const port = process.env.PORT || 3001
const app = express()
// const server = require('http').createServer(app);

// let user_socket_relation = []


// const io = socketio(server, {
//     cors: {
//         origin: '*',
//     }
// });

// io.on('connection', socket => {
//     const user_id = socket.handshake.query["user_id"];
//     console.log(`User connected ${socket.id}`);

//     if (user_id) {
//         user_socket_relation = user_socket_relation.filter((item) => item.user_id != user_id)
//         user_socket_relation.push({ user_id, socket_id: socket.id })
//     }

//     socket.on('send_message', async (data) => {
//         const { sender, reciever, message } = data
//         const participants = [sender, reciever]
//         const sender_socket_id = socket.id
//         const reciever_socket_id = user_socket_relation.find((item) => item.user_id === reciever)
//         const chat = await Chat.find({ participants: { $all: participants, $size: 2 } })
//         const chatId = chat._id || mongoose.Schema.Types.ObjectId
//         const new_message = new Message({ chatId, ...message })
//         new_message.save()
//         if (chat) {
//             await Chat.findByIdAndUpdate(chat._id, { lastMessage: new_message._id })
//         }
//         else {
//             const new_chat = new Chat({ _id: chatId, participants, lastMessage: new_message._id })
//             new_chat.save()
//         }

//         io.to(sender_socket_id).emit("new_message", {
//             conversation_id,
//             message: new_message,
//         });

//         if (reciever_socket_id) {
//             io.to(reciever_socket_id).emit("new_message", {
//                 conversation_id,
//                 message: new_message,
//             });
//         }
//     })
// })

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/activity', activityRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// server.listen(port, () => {
//     console.log(`Socket is running on ${port}`)
// })