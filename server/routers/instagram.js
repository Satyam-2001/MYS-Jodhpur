const express = require('express')
const { auth } = require('../middleware/auth')
const router = new express.Router()
const axios = require('axios')
const User = require("../models/User")
require('dotenv').config()

router.post('/access_token', auth, async (req, res) => {
    try {
        const appId = process.env.INSTAGRAM_APP_ID;
        const appSecret = process.env.INSTAGRAM_APP_SECRET;

        const shortLivedTokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', new URLSearchParams({
            client_id: appId,
            client_secret: appSecret,
            grant_type: 'authorization_code',
            redirect_uri: 'https://f8e6-2409-40d4-2053-5b1b-8d8b-6b9e-777e-1ca.ngrok-free.app/profile',
            code: req.body.code,
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => res.data);

        const longLivedTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
            params: {
                grant_type: 'ig_exchange_token',
                client_secret: appSecret,
                access_token: shortLivedTokenResponse.access_token
            }
        }).then(res => res.data);

        req.user.instagram = {
            access_token: longLivedTokenResponse.access_token,
            expires_in: new Date(longLivedTokenResponse.expires_in * 1000)
        }

        await req.user.save()

        // Send both tokens back to the client
        res.json(longLivedTokenResponse.data);
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router