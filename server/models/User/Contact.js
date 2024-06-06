const mongoose = require("mongoose")
const { isEmail, isURL, isMobilePhone } = require('validator');

const ContactSchema = mongoose.Schema({
    phone_number: {
        type: String,
        trim: true,
        required: true,
        validate: [isMobilePhone, 'Please fill a valid phone number']
    },
    alternate_phone_number: {
        type: String,
        trim: true,
        validate: [isMobilePhone, 'Please fill a valid phone number']
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Please fill a valid email address']
    },
    address: {
        type: String,
    },
    instagram: {
        type: String,
        trim: true,
        validate: [isURL, 'Please fill a valid linkedin url']
    },
    facebook: {
        type: String,
        trim: true,
        validate: [isURL, 'Please fill a valid linkedin url']
    },
}, { _id: false })

module.exports = ContactSchema