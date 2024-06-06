const mongoose = require("mongoose")

const AboutMeSchema = mongoose.Schema({
    about_me: {
        type: String,
    }
}, { _id: false })

module.exports = AboutMeSchema