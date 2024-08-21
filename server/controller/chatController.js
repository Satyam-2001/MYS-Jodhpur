const Chat = require('../models/Chat')
const Message = require('../models/Message');
const { getRelationByUserId } = require('./socketUtils');
const mongoose = require('mongoose');

async function chatMetaData(chatId, user_id) {
    const unreadCount = await Message.countDocuments({
        chatId,
        'readBy.participant': { $ne: user_id },
        from: { $ne: user_id }
    });
    const messages = await Message.find({ chatId }, {}, { sort: { created_at: -1 } }).populate('reply').limit(10)
    const total = await Message.find({ chatId }).countDocuments()
    return { messages, unread: unreadCount, total }
}

async function CreateChat(user_id, chat) {
    const new_chat = new Chat(chat)
    await new_chat.save()
    return new_chat
}

async function ChatUpgrade(chat, user) {
    const chat_mata_data = await chatMetaData(chat._id, user._id);

    if (chat_mata_data.messages?.length === 0) return null;

    const filteredParticipants = await Promise.all(
        chat.participants.map(async (participant) => {
            const filtered = await participant.filterUserFields(user);
            return filtered;
        })
    );

    return { ...chat_mata_data, ...chat.toObject(), participants: filteredParticipants };
}

async function FetchChatById(chat_id, user) {
    const chat = await Chat.findById(chat_id).populate({
        path: 'participants',
        select: 'basic_info last_seen status settings'
    });
    return await ChatUpgrade(chat, user)
}

async function FetchChats(user) {
    // Fetch chats where the user is a participant
    let chats = await Chat.find({ participants: { $all: [user._id] } })
        .populate({
            path: 'participants',
            select: 'basic_info last_seen status settings'
        });

    // Process each chat to filter participants and chat details
    const result = await Promise.all(
        chats.map(async (chat) => {
            return await ChatUpgrade(chat, user)
        })
    );

    // Remove null entries (in case any chats were filtered out)
    const nonEmptyChats = result.filter(chat => chat !== null);

    // Sort chats based on the latest message
    return nonEmptyChats.sort((a, b) => {
        // Ensure messages exist
        if (a.messages.length === 0 || b.messages.length === 0) return 0;
        return b.messages[0].created_at - a.messages[0].created_at;
    });
}

// Sample filterChat function to illustrate
async function filterChat(chat, user_id) {
    // Assume filterChat processes chat details based on the user
    // For example, removing messages that the user should not see
    // This function should return a filtered chat object
    return chat;
}


async function FetchChatByParticipants(participants) {
    const chats = await Chat.findOne({ participants: { $all: participants, $size: 2 } })
        .populate({
            path: 'participants',
            select: 'basic_info last_seen'
        })

    if (chats) return chats

    let new_chat = new Chat({ participants })
    new_chat = await new_chat.save()
    new_chat = await new_chat.populate({
        path: 'participants',
        select: 'basic_info last_seen'
    })

    return new_chat
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
    let participants = []
    for (const participant of chat.participants) {
        const user = getRelationByUserId(participant.toString())
        if (!user) continue
        participants = participants.concat(user)
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

module.exports = {
    CreateChat,
    FetchChatById,
    FetchChats,
    FetchChatByParticipants,
    ChatById,
    ReadChat,
    ActiveParticpantByChatId,
    ReadChat,
    DeleteChat
}