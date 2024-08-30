
const express = require("express")
const cors = require('cors');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');

const app = express()
app.use(cors())
app.use(express.json())

app.use(helmet())

// Limit requests from same API
const limiter = rateLimit({
    max: 60,
    windowMs: 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/', limiter)

module.exports = { app }
