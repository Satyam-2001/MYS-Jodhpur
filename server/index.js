require("./db/mongoose")
const express = require("express")
const cors = require('cors');
const authRouter = require("./routers/auth")
const userRouter = require("./routers/user")
const activityRouter = require("./routers/activity")

const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/activity', activityRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})