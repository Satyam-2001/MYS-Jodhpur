const express = require('express')
const { auth, authLazy } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()
const bcrypt = require("bcryptjs")
const { sendEmail, verifyEmail, resendEmail } = require('../controller/mail')

const getYearsBackDate = (year) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - year);
    return currentDate;
}

function getSortQuery(sortby) {
    if (!sortby) return {}
    if (sortby[0] === '-') return { [`basic_info.${sortby.substring(1)}`]: -1 }
    return { [`basic_info.${sortby}`]: 1 }
}

function getFilterQuery(filters, user) {
    const { search, min_age, max_age, min_height, max_height, min_income, max_income, gender } = filters
    const isLoggedIn = !!user
    const userGender = user?.basic_info?.gender
    const oppositeGender = userGender === 'Men' ? 'Women' : 'Men'
    const genderValue = isLoggedIn ? oppositeGender : gender
    const filter = {
        'basic_info.name': { $regex: search, $options: 'i' },
        'basic_info.date_of_birth': { $lte: getYearsBackDate(min_age), $gte: getYearsBackDate(max_age) },
        'basic_info.height': { $lte: max_height, $gte: min_height },
        'basic_info.income': { $lte: max_income, $gte: min_income },
    }
    if (genderValue) {
        filter['basic_info.gender'] = { $regex: `^${genderValue}$`, $options: 'i' }
    }
    return filter
}

router.get('/', authLazy, async (req, res) => {
    try {
        const { sortby, ...filters } = req.query
        const sort = getSortQuery(sortby)
        const filter = getFilterQuery(filters, req.user)
        const users = await User.find(filter, { basic_info: 1 }, { sort })
        res.send(users)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/me', auth, async (req, res) => {
    try {
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:id', authLazy, async (req, res) => {
    try {
        const userId = req.params.id
        const options = req.query.select === 'basic_info' ? { basic_info: 1 } : { shortlisted: 0, recieveintrest: 0, sendintrest: 0, matchintrest: 0 }
        const user = await User.findById(userId, options)
        if (!user) return res.status(404).send({ msg: 'User not exist' })
        filteredUser = await user.filterUserFields(req.user)
        res.send(filteredUser)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.patch('/password', auth, async (req, res) => {
    try {
        req.user['password'] = await bcrypt.hash(req.body.password, 8)
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/:field', auth, async (req, res) => {
    const allowedFields = ['basic_info', 'about_me', 'family', 'contact']
    try {
        const field = req.params.field
        if (!allowedFields.includes(field)) {
            return res.status(500).send(e)
        }
        req.user[field] = req.user[field] || {}
        Object.keys(req.body).forEach(update => req.user[field][update] = req.body[update])
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