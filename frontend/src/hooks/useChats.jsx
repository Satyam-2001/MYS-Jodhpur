import { useDispatch, useSelector } from "react-redux";
import { DeleteChat, chatActions } from "../store/ChatSlice";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import { useNavigate } from "react-router";

export default function useChats() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const { chats, reply_message, open_chat_id } = useSelector(state => state.chats)
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

    // function getSenderFromMessage(message) {
    //     if (!message) return
    //     const user = selected_chat.participants.find(item => item._id === message.from)
    //     return user
    // }

    function deleteMessage(message) {
        socket.emit('delete_message', message)
    }

    async function sendMessage(temp_message) {
        const temp_id = `new-message-${Math.random()}`
        let reply
        const chat = chats.find((chat) => chat._id === open_chat_id)
        if (reply_message?._id) {
            reply = chat.messages.find(item => item._id === reply_message?._id)
        }

        const message_to_be_added = {
            ...temp_message,
            reply,
            created_at: Date.now(),
            chatId: open_chat_id,
            status: 'loading',
            temp_id
        }
        dispatch(chatActions.addLoadingMessage({ message: message_to_be_added }))

        const message_to_be_send = {
            ...temp_message,
            chatId: open_chat_id,
            reply: reply_message?._id
        }
        socket.emit('send_message', message_to_be_send, (message) => {
            if (message) {
                dispatch(chatActions.replaceLoadingMessage({ message, temp_id }))
            }
        })
    }

    function deleteChat() {
        dispatch(DeleteChat(open_chat_id, socket))
        navigate(-1)
    }

    return { openReply, closeReply, deleteMessage, sendMessage, deleteChat, userData }
}