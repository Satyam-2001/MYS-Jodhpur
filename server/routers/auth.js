const express = require('express')
const { auth } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()
const { sendVerificationEmail, verifyEmail } = require('../controller/auth')

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
        const { email, phone_number, password, father_name, mother_name, father_occupation, mother_occupation, ...basic_info } = req.body
        const contact = { email, phone_number }
        const family = { father_name, mother_name, father_occupation, mother_occupation }
        const userData = { basic_info, contact, family, password }
        const user = new User(userData)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
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
        res.status(400).send(e)
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