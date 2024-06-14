import { createSlice } from '@reduxjs/toolkit';
import { socket } from '../services/socket';
import { dataTagSymbol } from '@tanstack/react-query';

const initialState = {
    chats: [],
    selected_chat: null,
    selected_messages: [],
    total_messages: 0,
    loading: false,
    reply_message: null,
}

function addNewMessage(state, chat, message) {
    const current_chat = state.chats.find(item => item._id == chat._id)
    state.chats = state.chats.filter(item => item._id != chat._id)
    let unread = current_chat.unread + 1
    if (state.selected_chat?._id === chat._id) {
        unread = 0
        state.selected_chat = chat
        state.selected_messages = [message, ...state.selected_messages]
    }
    state.chats = [...state.chats, { ...chat, unread }]
}

function updateMessage(state, message, find_function) {
    if (state.selected_chat._id !== message.chatId) return
    const index = state.selected_messages.findIndex(find_function)
    if (index === -1) return
    state.selected_messages[index] = message
}


const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats(state, action) {
            const { chats, userId } = action.payload
            state.chats = chats
        },
        setMessages(state, action) {
            const { chat, userId, message_data } = action.payload
            const { messages, total } = message_data
            state.total_messages = total
            state.selected_chat = chat
            state.selected_messages = messages
            const index = state.chats.findIndex(item => item._id == chat._id)
            state.chats[index] = { ...chat, unread: 0 }
        },
        setMoreMessages(state, action) {
            const { chat, userId, message_data } = action.payload
            const { messages, total } = message_data
            state.total_messages = total
            state.selected_chat = chat
            state.selected_messages = [...state.selected_messages, ...messages]
            state.loading = false
        },
        addMessage(state, action) {
            const { chat, message, userId } = action.payload
            addNewMessage(state, chat, message)
        },
        addLoadingMessage(state, action) {
            const { message, id } = action.payload
            const chat = state.selected_chat
            addNewMessage(state, chat, message)
        },
        replaceLoadingMessage(state, action) {
            const { chat, message, temp_id } = action.payload
            state.selected_messages = state.selected_messages.filter((item) => item.temp_id !== temp_id)
            addNewMessage(state, chat, message)
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        updateMessage(state, action) {
            const message = action.payload
            updateMessage(state, message, (item) => item._id === message._id)
        },
        deleteMessage(state, action) {
            const message = action.payload
            if (message.chatId !== state.selected_chat?._id) return
            if (!state.selected_messages) return
            state.selected_messages = state.selected_messages.filter(item => item._id !== message._id)
        },
        setReply(state, action) {
            state.reply_message = action.payload
        }
    }
})

export const chatActions = chatSlice.actions

export const LoadChats = (data, socket) => {
    return async (dispatch) => {
        const { userId } = data
        socket.emit('get_chats', { userId }, (chats) => {
            dispatch(chatActions.setChats({ userId, chats }))
        })
    }
}

export const LoadMessages = (data, socket) => {
    return async (dispatch, getState) => {
        const { userId } = data
        socket.emit('get_messages', data, (data) => {
            const { chat, message_data } = data
            dispatch(chatActions.setMessages({ chat, userId, message_data }))
        })
    };
};

export const LoadMoreMessages = (data, socket) => {
    return async (dispatch, getState) => {
        const { userId } = data
        const { chats } = getState()
        if (chats.loading) return
        dispatch(chatActions.setLoading(true))
        const skip = chats.selected_messages.length || 0
        socket.emit('get_messages', { skip, ...data }, (data) => {
            const { chat, message_data } = data
            dispatch(chatActions.setMoreMessages({ chat, userId, message_data }))
        })
    };
};

export const SendMessage = (data, socket) => {
    return async (dispatch) => {
        const { message } = data
        socket.emit('send_message', { message }, (message) => { })
    }
}

export const ReceiveMessage = ({ userId, chat, message }) => {
    return async (dispatch, getState) => {
        dispatch(chatActions.addMessage({ userId, chat, message }))
    }
}

export const GetOtherUserData = (myId, chat) => {
    if (!chat?.participants) return { last_seen: '', basic_info: { name: 'Loading...', profile_image: '' } }
    const user = chat.participants.find(user_item => user_item._id !== myId)
    return user
}

export default chatSlice