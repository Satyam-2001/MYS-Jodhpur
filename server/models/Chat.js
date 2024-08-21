const mongoose = require("mongoose")
const Message = require("./Message")

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'personal',
        enum: ['personal', 'group', 'channel'],
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chatId'
})

chatSchema.pre('remove', async function (next) {
    await Message.deleteMany({ chatId: this._id })
    next()
})

chatSchema.statics.fetchChatsByUserId = async (user_id) => {

    let chats = await Chat.find({ participants: { $all: [user_id] } }).populate({
        path: 'participants',
        select: 'basic_info'
    })

    const result = []

    for (let chat of chats) {
        const unreadCount = await Message.countDocuments({
            chatId: chat._id,
            'readBy.participant': { $ne: user_id },
            from: { $ne: user_id }
        });
        const messages = await Message.find({ chatId: chat._id }, {}, { sort: { created_at: -1 } }).limit(1)
        if (!messages) continue
        result.push({ ...chat.toObject(), messages, unread: unreadCount })
    }

    result.sort((a, b) => b.messages[0].created_at - a.messages[0].created_at)

    return result;
};

chatSchema.statics.fetchChatByParticipants = async (participants, options = { create: true }) => {
    const chats = await Chat.findOne({ participants: { $all: participants, $size: 2 } })
        .populate({
            path: 'participants',
            select: 'basic_info last_seen'
        })

    if (chats || options.create === false) return chats

    let new_chat = new Chat({ participants })
    new_chat = await new_chat.save()
    new_chat = await new_chat.populate({
        path: 'participants',
        select: 'basic_info last_seen'
    })

    return new_chat
}

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat