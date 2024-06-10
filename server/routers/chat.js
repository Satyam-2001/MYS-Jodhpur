const express = require('express')
const { auth, authLazy } = require('../middleware/auth')
const router = new express.Router()
const Chat = require("../models/Chat")
require('dotenv').config()
const { sendEmail, verifyEmail, resendEmail } = require('../controller/mail')

router.get('/list', auth, async (req, res) => {
    try {
        const userId = req.user._id
        const skip = req.params.skip || 0
        const limit = 10
        const chats = await Chat.find({ participants: { $all: [userId] } })
            .populate({
                path: 'participants',
                select: 'basic_info'
            })
            .populate('lastMessage')
            .sort({ 'lastMessage.createdAt': -1 }).skip(skip).limit(limit)
        const totalChats = Chat.countDocuments({ participants: userId })
        return {
            totalChats,
            totalPages: Math.ceil(totalChats / limit),
            data: chats
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
})