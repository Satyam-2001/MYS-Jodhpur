const mongoose = require("mongoose")

const SettingsSchema = new mongoose.Schema({
    profile_visibility: {
        type: String,
        default: 'Everybody'
    },
    contact_visibility: {
        type: String,
        default: 'Everybody'
    }
}, { _id: false })

module.exports = SettingsSchema