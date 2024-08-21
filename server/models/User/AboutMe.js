const mongoose = require("mongoose")

const AboutMeSchema = mongoose.Schema({
    bio: {
        type: String,
        maxLength: 500,
    },
    profile_managed_by: {
        type: String,
        maxLength: 50,
    },
}, { _id: false })

module.exports = AboutMeSchema