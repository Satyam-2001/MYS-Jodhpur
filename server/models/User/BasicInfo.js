const mongoose = require("mongoose")

const BasicInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50,
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
        maxLength: 50,
    },
    gender: {
        type: String,
        required: true,
        maxLength: 10,
    },
    height: {
        type: Number,
        min: 24,
        max: 90,
    },
    occupation: {
        type: String,
        maxLength: 50,
    },
    weight_category: {
        type: String,
        maxLength: 50,
    },
    location: {
        type: String,
        maxLength: 50,
    },
    education: {
        type: String,
        maxLength: 70,
    },
    income: {
        type: Number,
        min: 0,
        max: 10000,
    },
    manglik: {
        type: String,
        maxLength: 30,
    },
    profile_managed_by: {
        type: String,
        maxLength: 50,
    },
    complexion: {
        type: String,
        maxLength: 50,
    },
    profile_image: {
        type: String,
    },
    martial_status: {
        type: String,
        maxLength: 50,

    },
    diet: {
        type: String,
        maxLength: 50,

    },
    disability: {
        type: String,
        maxLength: 50,

    },
    disease: {
        type: String,
        maxLength: 70,

    },
    kundli_milan: {
        type: String,
        maxLength: 20,
    },
    gotra_self: {
        type: String,
        maxLength: 30,
    },
    gotra_nanihal: {
        type: String,
        maxLength: 30,
    }
}, { _id: false })

module.exports = BasicInfoSchema