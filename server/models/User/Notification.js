const mongoose = require("mongoose")

const NotificationSchema = mongoose.Schema({
    type: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    data: {
        type: mongoose.Schema.Types.Mixed
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
}, { _id: false })

NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = NotificationSchema