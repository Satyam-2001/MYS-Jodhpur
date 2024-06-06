const mongoose = require("mongoose")

const BasicInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    time_of_birth: {
        type: Date,
        required: true,
    },
    place_of_birth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
    },
    occupation: {
        type: String,
    },
    weight_category: {
        type: String,
    },
    location: {
        type: String,
    },
    education: {
        type: String,
    },
    income: {
        type: Number,
    },
    manglik: {
        type: String
    },
    profile_managed_by: {
        type: String,
    },
    color: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    martial_status: {
        type: String,
    },
    diet: {
        type: String,
    },
    disability: {
        type: String,
    },
    disease: {
        type: String,
    },
    kundli_milan: {
        type: String,
    },
    gotra_self: {
        type: String,
    },
    gotra_nanihal: {
        type: String,
    }
}, { _id: false })

module.exports = BasicInfoSchema