const jwt = require("jsonwebtoken")
const User = require("../models/User")

const verifyToken = async (authToken) => {
    const token = authToken.replace('Bearer ', '')
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
    if (!user) throw new Error()
    return { user, token }
}

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user) throw new Error()
        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        res.status(401).send({ error: 'Please Authenticate.' })
    }
}

const authLazy = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user) throw new Error()
        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        next()
    }
}

module.exports = { auth, authLazy, verifyToken }