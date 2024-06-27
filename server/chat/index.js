const http = require("http")
const socketio = require("socket.io");
const SocketController = require("../controller/socketController")
const appRouter = require('./routers/index')
const base_url = '/chatio/api/v1'

const defaultOptions = {
    cors: {
        origin: '*'
    }
}

function chatio(app, options = {}) {
    const { cors } = { ...defaultOptions, ...options }

    app.use(base_url, appRouter)
    const server = http.createServer(app);

    const io = socketio(server, { cors });

    io.on('connection', (socket) => {

        const socketController = new SocketController(socket)

        socket.on('send_message', socketController.sendMessage)
        socket.on('create_chat', socketController.createChat)
        socket.on('read_chat', socketController.readChat)
        socket.on('edit_message', socketController.editMessage)
        socket.on('delete_chat', socketController.deleteChat)
        socket.on('delete_message', socketController.deleteMessage)
        socket.on('disconnect', socketController.disconnect)

    })

    return server
}

module.exports = chatio