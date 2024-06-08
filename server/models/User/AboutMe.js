const mongoose = require("mongoose")

const AboutMeSchema = mongoose.Schema({
    about_me: {
        type: String,
        maxLength: 500,
    }
}, { _id: false })

module.exports = AboutMeSchema