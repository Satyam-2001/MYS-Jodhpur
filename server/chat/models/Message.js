const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    from: {
        type: String
    },
    type: {
        type: String,
        default: 'Text',
        enum: ["Text", "Media", "Document", "Link"],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
    },
    text: {
        type: String,
    },
    file: {
        type: String,
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    readBy: [
        {
            participant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            time: {
                type: Date,
            }
        }
    ]
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message
