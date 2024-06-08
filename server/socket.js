const { app, port } = require('./app')
const server = require('http').createServer(app);
const socketio = require('socket.io');

const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', socket => {
    
})

server.listen()