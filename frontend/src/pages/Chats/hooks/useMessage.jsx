import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { chatActions } from "../../../store/ChatSlice"
import { useContext, useMemo } from "react"
import { SocketContext } from "../../../context/SocketProvider"

export default function useMessage(message) {
    const { user } = useSelector(state => state.user)
    const { chats, open_chat_id } = useSelector(state => state.chats)
    const { socket } = useContext(SocketContext)
    const isMe = message.from === user?._id
    const selected_chat = chats.find((chat) => chat._id === open_chat_id)
    const sender = selected_chat?.participants?.find(item => item._id === message.from)
    const time = moment(new Date(message.created_at)).format('hh:mm A')
    const readByAll = message?.readBy?.find(({ participant }) => message.from !== participant)
    const dispatch = useDispatch()

    function setReply() {
        dispatch(chatActions.setReply(message))
    }

    function deleteMessage() {
        socket.emit('delete_message', message, (data) => {
            console.log(data)
        })
    }

    return { isMe, time, readByAll, setReply, deleteMessage, sender }
}