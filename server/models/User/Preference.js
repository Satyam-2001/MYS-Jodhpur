const mongoose = require("mongoose")

const PreferenceSchema = new mongoose.Schema({
    min_age: {
        type: Number,
        default: 18,
        min: [18, 'Not appropriate age for marriage'],
        max: 60,
    },
    max_age: {
        type: Number,
        default: 60,
        min: [18, 'Not appropriate age for marriage'],
        max: 60,
    },
    min_height: {
        type: Number,
        default: 48,
        min: [36, 'Too short for height'],
        max: 90,
    },
    min_income: {
        type: Number,
        default: 0,
        min: 0
    },
    max_income: {
        type: Number,
        default: 100,
        min: 0,
    },
    manglik: {
        type: String,
        maxLength: 100,
    },
    complexion: {
        type: String,
        maxLength: 100,
    },
    martial_status: {
        type: String,
        maxLength: 100,
    },
    diet: {
        type: String,
        maxLength: 100,
    },
    weight_category: {
        type: String,
        maxLength: 100,
    },
    mother_tongue: {
        type: String,
        maxLength: 200,
    },
    location: {
        type: String,
        maxLength: 300,
    },
    education: {
        type: String,
        maxLength: 200,
    },
    employeed_in: {
        type: String,
        maxLength: 200,
    },
    occupation: {
        type: String,
        maxLength: 200,
    },
    family_status: {
        type: String,
        maxLength: 50,
    },
    family_type: {
        type: String,
        maxLength: 50,
    },
    family_values: {
        type: String,
        maxLength: 50,
    },
    drinks: {
        type: String,
        maxLength: 50,
    },
    smoke: {
        type: String,
        maxLength: 50,
    },
}, { _id: false })

module.exports = PreferenceSchema