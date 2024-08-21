const Chat = require('../models/Chat')
const Message = require('../models/Message')

async function FetchMessagesByChatId(chat_id, { skip = 0, limit = 10 }) {
    const messages = await Message.find({ chatId: chat_id }).populate('reply').sort({ 'created_at': -1 }).skip(skip).limit(limit)
    const total = await Message.find({ chatId: chat_id }).countDocuments()
    const result = {
        messages,
        total,
    }
    return result
}

async function CreateMessage(user_id, message) {
    let new_message = new Message({ ...message, from: user_id, created_at: Date.now(), readBy: [] })
    new_message = await new_message.save()
    new_message = await new_message.populate('reply')
    return new_message
}

async function EditMessage(user_id, message) {
    const update_fields = ['type', 'text', 'file']
    const current_message = await Message.findById(message._id)
    if (current_message.from != user_id) {
        throw 'Cannot Edit Message'
    }
    current_message.updated_at = Date.now()
    update_fields.map(value => current_message[value] = message[value])
    const new_message = await current_message.save()
    return new_message
}

async function DeleteMessage(user_id, message_id) {
    const message = await Message.findById(message_id)
    if (message.from.toString() !== user_id) {
        throw 'Not Authorized'
    }
    await Message.findByIdAndDelete(message_id)
    return message
}

module.exports = { FetchMessagesByChatId, CreateMessage, EditMessage, DeleteMessage }