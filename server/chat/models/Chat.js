const mongoose = require("mongoose")
const Message = require("./Message")

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'personal',
        enum: ['personal', 'group', 'channel'],
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat