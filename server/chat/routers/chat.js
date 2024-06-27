const express = require('express')
const { FetchChats, ChatById } = require('../../controller/chatController')
const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        const chats = await FetchChats(req.params.user_id)
        res.send(chats)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    try {
        const options = {
            limit: req.params.limit,
            skip: req.params.skip
        }
        const chats = await ChatById(req.query.id, options)
        res.send(chats)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router