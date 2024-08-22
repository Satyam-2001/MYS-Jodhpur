const express = require('express')
const { auth } = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()
const { sendEmail, verifyEmail, resendEmail } = require('../controller/mail')
const { default: mongoose } = require('mongoose')
const sendMail = require('../controller/mail')
const moment = require('moment')
const { userIncludes, userFilter, userAdd } = require('../utils')
const baseUrl = process.env.BASE_URL

router.post('/', auth, async (req, res) => {
    try {
        const { profileId, type } = req.body
        const userId = req.user._id
        const userActivityData = { user: userId }
        switch (type) {
            case 'shortlist': {
                if (userIncludes(req.user.shortlisted, profileId)) {
                    req.user.shortlisted = userFilter(req.user.shortlisted, profileId)
                }
                else {
                    req.user.shortlisted = userAdd(req.user.shortlisted, profileId)
                }
                break;
            }
            case 'send': {
                req.user.sendinterest = userAdd(req.user.sendinterest, profileId)
                const notification = { type: 'user', data: { user: userId, message: 'You have receive an interest' } }
                const receiver = await User.findByIdAndUpdate(profileId, {
                    $push: {
                        receiveinterest: { $each: [userActivityData], $position: 0 },
                        notifications: { $each: [notification], $position: 0 }
                    }
                },
                    { new: true })
                break;
            }
            case 'cancel': {
                req.user.sendinterest = userFilter(req.user.sendinterest, profileId)
                await User.findByIdAndUpdate(profileId, {
                    $pull: { receiveinterest: userActivityData },
                })
                break;
            }
            case 'accept': {
                if (!userIncludes(req.user.receiveinterest, profileId)) return res.status(403).send()
                req.user.receiveinterest = userFilter(req.user.receiveinterest, profileId)
                req.user.matchinterest = userAdd(req.user.matchinterest, profileId)
                const notification = { type: 'user', data: { user: userId, message: 'Your interest has been accepted' } }
                await User.findByIdAndUpdate(profileId, {
                    $pull: { sendinterest: userActivityData },
                    $push: {
                        matchinterest: { $each: [userActivityData], $position: 0 },
                        notifications: { $each: [notification], $position: 0 }
                    }
                })
                break;
            }
            case 'decline': {
                req.user.receiveinterest = userFilter(req.user.receiveinterest, profileId)
                req.user.you_declined = userAdd(req.user.you_declined, profileId)
                await User.findByIdAndUpdate(profileId, {
                    $pull: { sendinterest: userActivityData },
                    $push: { they_declined: { $each: [userActivityData], $position: 0 } },
                })
                break;
            }
            case 'remove': {
                req.user.matchinterest = userFilter(req.user.matchinterest, profileId)
                req.user.you_declined = userAdd(req.user.you_declined, profileId)
                await User.findByIdAndUpdate(profileId, {
                    $pull: { matchinterest: userActivityData },
                    $push: { they_declined: { $each: [userActivityData], $position: 0 } },
                })
                break;
            }
            case 'block': {
                req.user.blocked_users = userAdd(req.user.blocked_users, profileId)
                break;
            }
            case 'unblock': {
                req.user.blocked_users = userFilter(req.user.blocked_users, profileId)
                break;
            }
        }
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/:field', auth, async (req, res) => {
    try {
        const field = req.params.field;

        // Ensure the field is a valid key in the user document
        if (!['shortlisted', 'sendinterest', 'receiveinterest', 'matchinterest', 'you_declined', 'they_declined', 'blocked_users'].includes(field)) {
            return res.status(400).send({ error: 'Invalid field' });
        }

        // Find the user and populate the field
        const user = await User.findById(req.user._id, { [field]: 1 })
            .populate({ path: `${field}.user`, select: 'basic_info images status last_seen', });

        // Ensure the requesting user's field data is up-to-date
        if (req.user[field].length !== user[field].length) {
            req.user[field] = user[field].map(data => ({ ...data, user: data.user._id }));
            await req.user.save();
        }

        // Apply filterUserFields to each user object in the list
        const filteredData = await Promise.all(
            user[field].map(async (data) => {
                // Filter the user fields based on the requesting user
                data.user = await data.user.filterUserFields(req.user);
                return data
            })
        );

        // Send the filtered data
        res.send(filteredData);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router