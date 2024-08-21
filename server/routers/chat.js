const express = require('express')
const { auth, authLazy } = require('../middleware/auth')
const router = new express.Router()
const Chat = require("../models/Chat")
const { FetchChats } = require('../controller/chatController')
require('dotenv').config()

router.get('/list', auth, async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await FetchChats(req.user)
        res.send(chats)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router