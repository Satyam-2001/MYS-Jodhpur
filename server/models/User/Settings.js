const mongoose = require("mongoose")

const SettingsSchema = new mongoose.Schema({
    profile_visibility: {
        type: String,
        default: 'Everybody'
    },
    contact_visibility: {
        type: String,
        default: 'Only to Matches'
    },
    show_activity_status: {
        type: Boolean,
        default: true,
    },
    name_visibility: {
        type: String,
        default: 'Everybody',
    },
    image_visibility: {
        type: String,
        default: 'Everybody',
    },
    chat_notificaton: {
        type: Boolean,
        default: true,
    },
    email_notification: {
        type: Boolean,
        default: true,
    }
}, { _id: false })

module.exports = SettingsSchema