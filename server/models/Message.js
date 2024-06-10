const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    text: {
        type: String,
    },
    file: {
        type: String,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message
