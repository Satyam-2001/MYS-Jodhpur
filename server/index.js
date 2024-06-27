require('dotenv').config()
require("./db/mongoose")
const authRouter = require("./routers/auth")
const userRouter = require("./routers/user")
const activityRouter = require("./routers/activity")
const chatRouter = require("./routers/chat")
const { server } = require('./socket')
const { app } = require('./app')
// const chatio = require('./chat')

const port = process.env.SOCKET_PORT || 4000

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/activity', activityRouter)
app.use('/chat', chatRouter)
// const server = chatio(app)

server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})