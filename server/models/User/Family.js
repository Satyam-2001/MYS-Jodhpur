const mongoose = require("mongoose")

const FamilySchema = new mongoose.Schema({
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
    father_name: {
        type: String,
        maxLength: 50,
    },
    family_income: {
        type: Number,
    },
    father_occupation: {
        type: String,
        maxLength: 50,
    },
    mother_name: {
        type: String,
        maxLength: 50,
    },
    mother_occupation: {
        type: String,
        maxLength: 50,
    },
}, { _id: false })

module.exports = FamilySchema