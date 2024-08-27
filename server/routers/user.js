const express = require('express')
const { auth, authLazy } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()
const bcrypt = require("bcryptjs")
const { sendEmail, verifyEmail, resendEmail } = require('../controller/mail')
const { getSortQuery, getFilterQuery } = require('../utils/user.utils')

router.get('/list', authLazy, async (req, res) => {
    try {
        const { page = 1, limit = 10, sortby, ...filters } = req.query
        const skip = (page - 1) * limit;
        const sort = sortby ? getSortQuery(sortby) : getSortQuery('-last_seen', '')
        const filter = getFilterQuery(filters, req.user, { exclude: true })
        const query = User.find(filter, { basic_info: 1, status: 1, last_seen: 1, settings: 1, images: 1 }, { sort })
        const total = await User.countDocuments(filter);
        const users = await User.find(filter, { basic_info: 1, status: 1, last_seen: 1, settings: 1, images: 1 })
            .sort(sort)
            .skip(skip)
            .limit(limit);
        const filteredUsers = await Promise.all(
            users.map(async (user) => {
                return await user.filterUserFields(req.user);
            })
        );

        const data = {
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            users: filteredUsers,
        };
        res.send(data);
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/:id', authLazy, async (req, res) => {
    try {
        const userId = req.params.id
        const options = req.query.select === 'basic_info' ? { basic_info: 1 } : { shortlisted: 0, receiveinterest: 0, sendinterest: 0, matchinterest: 0 }
        const user = await User.findById(userId, options)
        if (!user) return res.status(404).send({ msg: 'User not exist' })
        filteredUser = await user.filterUserFields(req.user)
        res.send(filteredUser)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/password', auth, async (req, res) => {
    try {
        req.user['password'] = req.body.password
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/:field', auth, async (req, res) => {
    const allowedFields = ['basic_info', 'about_me', 'family', 'contact', 'settings', 'preference']
    try {
        const field = req.params.field
        if (!allowedFields.includes(field)) {
            return res.status(500).send(e)
        }
        req.user[field] = req.user[field] || {}
        Object.keys(req.body).forEach((update) => {
            req.user[field][update] = req.body[update] === '' ? undefined : req.body[update]
        })
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.post('/image', auth, async (req, res) => {
    try {
        req.user.images = req.user.images || []
        req.user.images = [...req.user.images, ...req.body.image]
        if (!req.user.basic_info.profile_image) {
            req.user.basic_info.profile_image = req.body.image[0]
        }
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.post('/image/profile', auth, async (req, res) => {
    try {
        req.user.basic_info.profile_image = req.body.image
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/image', auth, async (req, res) => {
    try {
        req.user.images = req.user.images.filter(image => image !== req.body.image)
        if (req.user.basic_info.profile_image === req.body.image) {
            req.user.basic_info.profile_image = req.user.images?.[0]
        }
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router