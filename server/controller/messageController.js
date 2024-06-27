const Chat = require('../chat/models/Chat')
const Message = require('../chat/models/Message')

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
        throw 'Cannott Edit Message'
    }
    current_message.updated_at = Date.now()
    update_fields.map(value => current_message[value] = message[value])
    const new_message = await current_message.save()
    return new_message
}

async function DeleteMessage(user_id, message_id) {
    const message = await Message.findById(message_id)
    if (message.from !== user_id) {
        callback(undefined, 'Not Authorized')
        return
    }
    await Message.findByIdAndDelete(message_id)
    return message
}

module.exports = { CreateMessage, EditMessage, DeleteMessage }