const mongoose = require("mongoose")

const FamilySchema = new mongoose.Schema({
    father_name: {
        type: String,
    },
    father_occupation: {
        type: String,
    },
    mother_name: {
        type: String,
    },
    mother_occupation: {
        type: String,
    },
}, { _id: false })

module.exports = FamilySchema