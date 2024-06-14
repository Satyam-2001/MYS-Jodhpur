import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/ChatSlice";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketProvider";

export default function useChats() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { chats, reply_message, selected_chat, selected_messages } = useSelector(state => state.chats)
    const [userData, setUserData] = useState()
    const { socket } = useContext(SocketContext)

    // useEffect(() => {
    //     if (!selected_chat?.participants) return
    //     const user = selected_chat.participants.find(item => item._id != user._id)
    //     setUserData(user)
    // }, [selected_chat])

    function openReply(message) {
        dispatch(chatActions.setReply(message))
    }

    function closeReply() {
        dispatch(chatActions.setReply(null))
    }

    function getSenderFromMessage(message) {
        if (!message) return
        const user = selected_chat.participants.find(item => item._id === message.from)
        return user
    }

    function deleteMessage(message) {
        socket.emit('delete_message', message)
    }

    async function sendMessage(temp_message) {
        const temp_id = `new-message-${Math.random()}`
        let reply
        if (reply_message?._id) {
            reply = selected_messages.find(item => item._id === reply_message?._id)
        }

        const message_to_be_added = {
            ...temp_message,
            reply,
            created_at: Date.now(),
            chatId: selected_chat._id,
            status: 'loading',
            temp_id
        }
        dispatch(chatActions.addLoadingMessage({ message: message_to_be_added }))

        const message_to_be_send = {
            ...temp_message,
            reply: reply_message?._id
        }
        socket.emit('send_message', { message: message_to_be_send }, (chat, message) => {
            dispatch(chatActions.replaceLoadingMessage({ chat, message, temp_id }))
        })
    }

    return { openReply, closeReply, getSenderFromMessage, deleteMessage, sendMessage, userData }
}