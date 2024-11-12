const express = require('express')
const { auth } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
const axios = require('axios')
require('dotenv').config()
const { sendVerificationEmail, verifyEmail } = require('../controller/auth')
const { getAge, generateBio } = require('../utils')

const verifyUnique = async (req, res, next) => {
    try {
        const { email } = req.body
        const isEmailRegistered = await User.findOne({ 'contact.email': email })
        if (isEmailRegistered) {
            res.status(406).send({
                msg: 'Email is already registered'
            })
            return
        }
        next()
    }
    catch (e) {
        res.status(400).send(e)
    }
}

router.post('/otp/send', verifyUnique, sendVerificationEmail)

router.post('/register', verifyEmail, async (req, res) => {
    try {
        const { email, phone_number, password, ...basic_info } = req.body
        const contact = { email, phone_number }
        const userData = { basic_info, contact, password, about_me: { bio: generateBio(basic_info) } }
        const user = new User(userData)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials({ 'contact.email': email }, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/google-login', async (req, res) => {
    try {
        const { access_token } = req.body
        const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then(res => res.data);
        const user = await User.findOne({ 'contact.email': userInfo.email })
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        await req.user.logout(req.token)
        res.send({ msg: 'success' })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.user._id })
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router