const mongoose = require("mongoose")

const FamilySchema = new mongoose.Schema({
    father_name: {
        type: String,
        maxLength: 50,
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