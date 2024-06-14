const mongoose = require("mongoose");
const Message = require("./Message");

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
});


chatSchema.statics.fetchChatsByUserId = async (userId) => {
    const chats = await Chat.find({ participants: { $all: [userId] }, lastMessage: { $exists: true } })
        .populate({
            path: 'participants',
            select: 'basic_info last_seen'
        })
        .populate('lastMessage')
        .sort({ 'lastMessage.createdAt': -1 });

    const result = [];

    for (const chat of chats) {
        const unreadMessagesCount = await Message.CountUnreadMessages(chat._id, userId)
        result.push({ ...chat.toObject(), unread: unreadMessagesCount });
    }

    return result;
};

chatSchema.statics.fetchChatByParticipants = async (participants, options = { create: true }) => {
    const chats = await Chat.findOne({ participants: { $all: participants, $size: 2 } })
        .populate({
            path: 'participants',
            select: 'basic_info last_seen'
        })
        .populate('lastMessage')

    if (chats || options.create === false) return chats

    let new_chat = new Chat({ participants })
    new_chat = await new_chat.save()
    new_chat = await new_chat.populate({
        path: 'participants',
        select: 'basic_info last_seen'
    })

    return new_chat
}

chatSchema.statics.updateChatLastSeenMessage = async (chatId, messageId) => {
    await Chat.findByIdAndUpdate(chatId, { lastMessage: messageId })
    return await Chat.findById(chatId).populate({
        path: 'participants',
        select: 'basic_info last_seen'
    })
        .populate('lastMessage')

}

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat