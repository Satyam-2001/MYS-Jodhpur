const mongoose = require('mongoose');

const readSchema = new mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
    }
}, { _id: false })

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
    },
    created_at: {
        type: Date,
        default: Date.now,
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
    readBy: [readSchema],
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    }
});

messageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


messageSchema.statics.SetAsRead = async (messageId, userId) => {
    const message = await Message.findById(messageId).populate('reply')
    const readByUser = message.readBy.findIndex(({ participant }) => participant == userId)
    if (readByUser === -1) {
        message.readBy.push({
            participant: userId,
            time: Date.now()
        })
        await message.save()
    }
    return message
}

messageSchema.statics.SendMessage = async (chatId, message) => {
    let new_message = new Message({ ...message, chatId, created_at: Date.now(), readBy: [{ participant: message.from, time: Date.now() }] })
    new_message = await new_message.save()
    new_message = await new_message.populate('reply')
    return new_message
}

messageSchema.statics.CountUnreadMessages = async function (chatId, participantId) {
    const counts = await Message.countDocuments({
        chatId: chatId,
        'readBy.participant': { $ne: participantId },
        from: { $ne: participantId }
    });
    return counts
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message
