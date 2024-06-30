const Chat = require('../chat/models/Chat')
const Message = require('../chat/models/Message')

async function CreateChat(user_id, chat) {
    const new_chat = new Chat(chat)
    await new_chat.save()
    return new_chat
}

async function FetchChats(user_id) {
    let chats = await Chat.find({ participants: { $all: [user_id] } }).populate({
        path: 'messages',
        options: {
            limit: 1,
            sort: { created_at: -1 }
        }
    }).populate({
        path: 'participants',
        select: 'basic_info last_seen'
    })

    chats = chats.filter(chat => chat.messages.length >= 1)
    const result = []

    for (let chat of chats) {
        const unreadCount = await Message.countDocuments({
            chatId: chat._id,
            'readBy.participant': { $ne: user_id },
            from: { $ne: user_id }
        });
        result.push({ ...chat.toObject(), unread: unreadCount })
    }

    return chats
}

async function ChatById(chat_id, options = {}) {
    let chat = await Chat.findById(chat_id).populate({
        path: 'messages',
        options: {
            ...options,
            sort: { created_at: -1 }
        }
    })
    return chat
}

async function ActiveParticpantByChatId(chat_id) {
    const chat = await Chat.findById(chat_id).select({ participants: 1 })
    const participants = []
    for (const participant of chat.participants) {
        const user = getRelationByUserId(participant)
        if (!user) continue
        participants.concat(user)
    }
    return participants
}

async function ReadChat(user_id, chat_id) {
    const chat = await Chat.findById(chat_id).select({ participants: 1 })
    if (!chat.participants.includes(user_id)) {
        throw 'User not exist in chat'
    }
    const result = await Message.updateMany({
        chatId: chat_id,
        'readBy.participant': { $ne: user_id },
        from: { $ne: user_id }
    },
        {
            $push: { readBy: { participant: user_id, time: Date.now() } }
        }
    )
    return result
}

async function DeleteChat(user_id, chat_id) {
    const chat = await Chat.findById(chat_id)
    if (!chat) {
        throw 'Chat not exist'
    }
    if (!chat.participants.includes(user_id)) {
        throw 'User cannot delete chats'
    }
    await Chat.deleteOne({ _id: chat_id })
    return chat
}

module.exports = { CreateChat, FetchChats, ChatById, ReadChat, ActiveParticpantByChatId, ReadChat, DeleteChat }