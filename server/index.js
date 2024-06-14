require("./db/mongoose")
const authRouter = require("./routers/auth")
const userRouter = require("./routers/user")
const activityRouter = require("./routers/activity")
const { server } = require('./socket')
const { app } = require('./app')

const port = process.env.PORT || 3001
const socket_port = process.env.SOCKET_PORT || 4000

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/activity', activityRouter)

// app.listen(port, () => {
//     console.log(`Server is running on ${port}`)
// })

server.listen(socket_port, () => {
    console.log(`Socket is running on ${socket_port}`)
})