const express = require('express')
const { auth } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()
const { sendEmail, verifyEmail, resendEmail } = require('../controller/mail')
const { default: mongoose } = require('mongoose')

router.post('/', auth, async (req, res) => {
    try {
        const { profileId, type } = req.body
        const userId = req.user._id
        if (type === 'shortlist') {
            if (req.user.shortlisted.includes(profileId)) {
                req.user.shortlisted = req.user.shortlisted.filter((id) => id != profileId)
            }
            else {
                req.user.shortlisted = [profileId].concat(req.user.shortlisted)
            }
        }
        else if (type === 'send') {
            req.user.sendintrest = [profileId].concat(req.user.sendintrest)
            await User.findByIdAndUpdate(profileId, { $push: { recieveintrest: { $each: [userId], $position: 0 } } })
        }
        else if (type === 'cancel') {
            req.user.sendintrest = req.user.sendintrest.filter((id) => id != profileId)
            await User.findByIdAndUpdate(profileId, { $pull: { recieveintrest: userId } })
        }
        else if (type === 'accept') {
            req.user.recieveintrest = req.user.recieveintrest.filter((id) => id != profileId)
            req.user.matchintrest = [profileId, ...req.user.matchintrest]
            await User.findByIdAndUpdate(profileId, { $pull: { sendintrest: userId }, $push: { matchintrest: { $each: [userId], $position: 0 } } })
        }
        else if (type === 'decline') {
            req.user.recieveintrest = req.user.recieveintrest.filter((id) => id != profileId)
            await User.findByIdAndUpdate(profileId, { $pull: { sendintrest: userId } })
        }
        else if (type === 'remove') {
            req.user.matchintrest = req.user.matchintrest.filter((id) => id != profileId)
            await User.findByIdAndUpdate(profileId, { $pull: { matchintrest: userId } })
        }
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const result = await User.findById(req.user._id)
            .select('shortlisted sendintrest recieveintrest matchintrest')
            .populate({
                path: 'shortlisted',
                select: 'basic_info',
                options: { limit: 5 },
            })
            .populate({
                path: 'sendintrest',
                select: 'basic_info',
                options: { limit: 5 },
            })
            .populate({
                path: 'recieveintrest',
                select: 'basic_info',
                options: { limit: 5 },
            })
            .populate({
                path: 'matchintrest',
                select: 'basic_info',
                options: { limit: 5 },
            })
        res.send(result)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/:field', auth, async (req, res) => {
    try {
        const field = req.params.field
        const user = await User.findById(req.user._id, { [field]: 1 }).populate({ path: field, select: 'basic_info' })
        res.send(user[field])
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router