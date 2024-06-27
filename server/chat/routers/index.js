const express = require('express')
const router = new express.Router()
const chatRouter = require('./chat')
const messageRouter = require('./message')

router.use('/chat', chatRouter)
router.use('/message', messageRouter)

module.exports = router