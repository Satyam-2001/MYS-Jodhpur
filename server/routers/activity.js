const express = require('express')
const { auth } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()
const { sendEmail, verifyEmail, resendEmail } = require('../controller/mail')
const { default: mongoose } = require('mongoose')

async function includesProfileId(field, userId, profileId) {
    try {
        const user = await User.findById(userId, { [field]: 1 })
        if (user[field].includes(profileId)) return true
    }
    catch {
        return false
    }
    return false
}

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
            req.user.sendinterest = [profileId].concat(req.user.sendinterest)
            await User.findByIdAndUpdate(profileId, { $push: { recieveinterest: { $each: [userId], $position: 0 } } })
        }
        else if (type === 'cancel') {
            req.user.sendinterest = req.user.sendinterest.filter((id) => id != profileId)
            await User.findByIdAndUpdate(profileId, { $pull: { recieveinterest: userId } })
        }
        else if (type === 'accept') {
            if (!req.user.recieveinterest.includes(profileId)) res.status(403).send()
            req.user.recieveinterest = req.user.recieveinterest.filter((id) => id != profileId)
            req.user.matchinterest = [profileId, ...req.user.matchinterest]
            await User.findByIdAndUpdate(profileId, { $pull: { sendinterest: userId }, $push: { matchinterest: { $each: [userId], $position: 0 } } })
        }
        else if (type === 'decline') {
            req.user.recieveinterest = req.user.recieveinterest.filter((id) => id != profileId)
            await User.findByIdAndUpdate(profileId, { $pull: { sendinterest: userId } })
        }
        else if (type === 'remove') {
            req.user.matchinterest = req.user.matchinterest.filter((id) => id != profileId)
            await User.findByIdAndUpdate(profileId, { $pull: { matchinterest: userId } })
        }
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:field', auth, async (req, res) => {
    try {
        const field = req.params.field
        const user = await User.findById(req.user._id, { [field]: 1 }).populate({ path: field, select: 'basic_info' })
        if (req.user[field].length != user[field].length) {
            req.user[field] = user[field].map(user => user._id)
            await req.user.save()
        }
        res.send(user[field])
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router