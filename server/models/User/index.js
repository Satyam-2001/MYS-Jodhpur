const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const BasicInfoSchema = require("./BasicInfo")
const ContactSchema = require('./Contact')
const FamilySchema = require('./Family')
const SettingsSchema = require('./Settings')
const AboutMeSchema = require('./AboutMe')
const Chat = require("../Chat")
const PreferenceSchema = require("./Preference")
const NotificationSchema = require("./Notification")
const { userIncludes } = require("../../utils")
require('dotenv').config();

const activityUserListSchema = [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    }
}]

const lastSeenSchema = {
    type: Date,
    default: Date.now,
}

const statusSchema = {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
}


const userSchema = new mongoose.Schema({
    basic_info: BasicInfoSchema,
    about_me: AboutMeSchema,
    family: FamilySchema,
    contact: ContactSchema,
    settings: SettingsSchema,
    preference: PreferenceSchema,
    status: statusSchema,
    last_seen: lastSeenSchema,
    last_seen_activity: lastSeenSchema,
    last_seen_notification: lastSeenSchema,
    shortlisted: activityUserListSchema,
    sendinterest: activityUserListSchema,
    receiveinterest: activityUserListSchema,
    matchinterest: activityUserListSchema,
    you_declined: activityUserListSchema,
    they_declined: activityUserListSchema,
    blocked_users: activityUserListSchema,
    notifications: [NotificationSchema],
    instagram: {
        access_token: {
            type: String,
        },
        expires_in: {
            type: Date,
        }
    },
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

function ensureMaxLength(array, maxLength) {
    if (array.length > maxLength) {
        return array.slice(-maxLength);
    }
    return array;
}

function cleanUserData(userObject) {
    if (userObject?.settings?.show_activity_status !== undefined && !userObject.settings.show_activity_status) {
        delete userObject.status
        delete userObject.last_seen
    }
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    return cleanUserData(userObject)
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    this.tokens = ensureMaxLength(this.tokens, 5)
    await this.save()
    return token
}

userSchema.methods.logout = async function (tokenToRemove) {
    if (tokenToRemove) {
        // Remove the specific token
        this.tokens = this.tokens.filter((token) => token.token !== tokenToRemove);
    } else {
        // Remove all tokens
        this.tokens = [];
    }

    await this.save();
}

userSchema.methods.filterUserFields = async function (user) {
    const userObject = this.toJSON()

    if (this._id.toString() === user?._id?.toString()) return userObject

    const isSend = userIncludes(user?.receiveinterest, userObject?._id)
    const isMatch = userIncludes(user?.matchinterest, userObject?._id)

    function hideContact() {
        delete userObject.contact
        userObject.contact = 'hidden'
    }

    function hideName() {
        userObject.basic_info.name = userObject?.basic_info?.name?.[0] + '****'
    }

    function hideImages() {
        delete userObject?.basic_info?.profile_image;
        delete userObject?.images;
    }

    function filterBasedOnOption(option, hideFunction) {
        switch (option) {
            case 'Nobody': {
                hideFunction()
                break
            }
            case 'Only to Registered Users': {
                if (!user) {
                    hideFunction()
                }
                break
            }
            case 'Only to Interest Sent/ Matches': {
                if (!(isMatch || isSend)) {
                    hideFunction()
                }
                break;
            }
            case 'Only to Matches': {
                if (!isMatch) {
                    hideFunction()
                }
                break
            }
        }
    }

    filterBasedOnOption(userObject.settings?.contact_visibility, hideContact)
    filterBasedOnOption(userObject.settings?.name_visibility, hideName)
    filterBasedOnOption(userObject.settings?.image_visibility, hideImages)


    if (userObject?.settings?.show_activity_status !== undefined && !userObject.settings.show_activity_status) {
        delete userObject.status
        delete userObject.last_seen
    }

    return userObject
}

userSchema.statics.findByCredentials = async (user_credentials, password) => {
    const user = await User.findOne(user_credentials)
    if (user && await bcrypt.compare(password, user.password)) {
        return user
    }
    throw { msg: 'Incorrect email or password' }
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    await Chat.deleteMany({ type: 'personal', participants: { $all: [this._id] } })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User