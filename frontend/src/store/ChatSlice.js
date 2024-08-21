import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: [],
    open_chat_id: null,
    loading: false,
    reply_message: null,
}

function insertAtBegin(state, chatId) {
    const current_chat = state.chats.find(item => item._id == chatId)
    state.chats = state.chats.filter(item => item._id != chatId)
    state.chats.unshift(current_chat)
}

function addNewMessage(state, message, { replace = false, temp_id } = {}) {
    const chatId = message.chatId
    const index = state.chats.findIndex(item => item._id == chatId)
    let unread = 0
    if (index === -1) return
    if (state.open_chat_id != chatId) {
        unread = state.chats[index].unread + 1
    }
    state.chats[index].messages.unshift(message)
    state.chats[index].unread = unread
    if (replace) {
        state.chats[index].messages = state.chats[index].messages.filter((item) => item.temp_id !== temp_id)
    }
    // insertAtBegin(state, state.chats[index]._id)
}

function updateMessage(state, message, find_function) {
    const chatId = message.chatId
    const index = state.chats.findIndex(item => item._id === chatId)
    if (index === -1) return
    const message_index = state.chats[index].messages.findIndex(find_function)
    if (message_index === -1) return
    state.chats[index].messages[message_index] = message
}


const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats(state, action) {
            const { chats, userId } = action.payload
            state.chats = chats
        },
        addChat(state, action) {
            state.chats.push(action.payload)
        },
        setMessages(state, action) {
            const { chat, messages, total } = action.payload
            state.open_chat_id = chat._id
            const index = state.chats.findIndex(item => item._id == chat._id)
            const new_chat = { ...chat, messages, unread: 0, total }
            if (index === -1) {
                state.chats.push(new_chat)
            }
            else {
                state.chats[index] = new_chat
            }
        },
        setMoreMessages(state, action) {
            const { chat, userId, messages, total } = action.payload
            state.open_chat_id = chat._id
            state.loading = false
            const index = state.chats.findIndex(item => item._id == state.open_chat_id)
            const current_messages = index != -1 ? state.chats[index].messages : []
            const new_chat = { ...chat, messages: [...current_messages, ...messages], unread: 0, total }
            if (index === -1) {
                state.chats.push(new_chat)
            }
            else {
                state.chats[index] = new_chat
            }
        },
        addMessage(state, action) {
            const { message, userId } = action.payload
            addNewMessage(state, message)
        },
        addLoadingMessage(state, action) {
            const { message, id } = action.payload
            addNewMessage(state, message)
        },
        replaceLoadingMessage(state, action) {
            const { message, temp_id } = action.payload
            addNewMessage(state, message, { replace: true, temp_id })
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
            const chatId = message.chatId
            const index = state.chats.findIndex(item => item._id === chatId)
            if (index === -1) return
            state.chats[index].messages = state.chats[index].messages.filter(item => item._id !== message._id)
        },
        deleteChat(state, action) {
            const chatId = action.payload
            if (state.open_chat_id == chatId) {
                state.open_chat_id = null
            }
            state.chats = state.chats.filter(chat => chat._id != chatId)
        },
        setReply(state, action) {
            state.reply_message = action.payload
        },
        setOpenChat(state, action) {
            state.open_chat_id = action.payload
            if (state.open_chat_id) {
                const index = state.chats.findIndex(item => item._id === state.open_chat_id)
                state.chats[index].unread = 0
            }
        },
        readChat(state, action) {
            const { userId, chatId } = action.payload
            const index = state.chats.findIndex(chat => chat._id === chatId)
            if (index == -1) return;
            const time = Date.now()
            state.chats[index].messages = state.chats[index].messages.map(message => {
                if (message.readBy.find(({ participant }) => participant === userId)) return message
                return { ...message, readBy: [...message.readBy, { participant: userId, time }] }
            })
        }
    }
})

export const chatActions = chatSlice.actions

// export const OpenChat = (chatId) => {
//     return async (dispatch) => {
//         socket.emit('read_chat', chatId, (data) => { })
//         dispatch(chatActions.setOpenChat(chat._id))
//     }
// }

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
        const { chats } = getState()
        const chat = chats.chats.find(({ participants }) => participants.findIndex(({ _id }) => _id === userId) >= 0)
        if (chat) {
            socket.emit('read_chat', chat._id, () => { })
            dispatch(chatActions.setOpenChat(chat._id))
            return;
        }
        socket.emit('get_messages', data, (data, e) => {
            const { chat, messages, total } = data
            dispatch(chatActions.setMessages({ chat, userId, messages, total }))
        })
    };
};

export const LoadMoreMessages = (data, socket) => {
    return async (dispatch, getState) => {
        const { userId } = data
        const { chats } = getState()
        if (chats.loading) return
        dispatch(chatActions.setLoading(true))
        const index = chats.chats.findIndex(chat => chat._id === chats.open_chat_id)
        const skip = chats.chats[index]?.messages?.length || 0
        socket.emit('get_messages', { skip, ...data }, (data) => {
            const { chat, messages, total } = data
            dispatch(chatActions.setMoreMessages({ chat, userId, messages, total }))
        })
    };
};

export const SendMessage = (data, socket) => {
    return async (dispatch) => {
        const { message } = data
        socket.emit('send_message', { message }, (message) => { })
    }
}

export const ReceiveMessage = ({ userId, message }, socket) => {
    return async (dispatch, getState) => {
        const { chats } = getState()
        const chat = chats.chats.find(({ _id }) => _id === message.chatId)
        if (!chat) {
            socket.emit('get_chat_by_id', message.chatId, (chat) => {
                if (!chat) return
                dispatch(chatActions.addChat(chat))
            })
        }
        else {
            dispatch(chatActions.addMessage({ userId, message }))
        }
    }
}

export const DeleteChat = (chatId, socket) => {
    return async (dispatch) => {
        socket.emit('delete_chat', chatId, () => {
            dispatch(chatActions.deleteChat(chatId))
        })
    }
}

export const GetOtherUserData = (myId, chat) => {
    if (!chat?.participants) return { last_seen: '', basic_info: { name: 'Loading...', profile_image: '' } }
    const user = chat.participants.find(user_item => user_item._id !== myId)
    return user
}

export default chatSlice