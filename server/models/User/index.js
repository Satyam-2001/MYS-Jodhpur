const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const BasicInfoSchema = require("./BasicInfo")
const ContactSchema = require('./Contact')
const FamilySchema = require('./Family')
const SettingsSchema = require('./Settings')
const AboutMeSchema = require('./AboutMe')
require('dotenv').config();

const userSchema = new mongoose.Schema({
    basic_info: BasicInfoSchema,
    about_me: AboutMeSchema,
    family: FamilySchema,
    contact: ContactSchema,
    settings: SettingsSchema,

    shortlisted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sendinterest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    recieveinterest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    matchinterest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    images: {
        type: [String],
        validate: {
            validator: function (array) {
                return array.length <= 10;
            },
            message: 'You can store up to 10 images only.'
        },
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
    }]
}, { timestamps: true })

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    if (userObject.basic_info?.date_of_birth) {
        userObject.basic_info.age = getAge(userObject.basic_info.date_of_birth)
    }
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.PRIVATE_KEY)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.methods.filterUserFields = async function (user) {
    const userObject = this.toJSON()

    if (this._id.toString() === user?._id?.toString()) return userObject

    switch (userObject.settings?.contact_visibility) {
        case 'Nobody': {
            delete userObject.contact
            userObject.contact = 'hidden'
            break
        }
        case 'Only Registered Users': {
            if (!user) {
                delete userObject.contact
                userObject.contact = 'hidden'
            }
            break
        }
        case 'Only Matches': {
            if (!user || !user.matchinterest?.includes(userObject._id)) {
                delete userObject.contact
                userObject.contact = 'hidden'
            }
            break
        }
    }
    return userObject
}

userSchema.statics.findByCredentials = async (user_credentials, password) => {
    const user = await User.findOne(user_credentials)
    if (user && await bcrypt.compare(password, user.password)) {
        return user
    }
    throw { msg: 'Unable to Login' }
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User