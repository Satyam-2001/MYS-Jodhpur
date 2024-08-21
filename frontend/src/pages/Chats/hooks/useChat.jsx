import { useDispatch, useSelector } from "react-redux"
import { GetOtherUserData, LoadMoreMessages } from "../../../store/ChatSlice"
import { useContext } from "react"
import { SocketContext } from "../../../context/SocketProvider"

export default function useChat() {
    const dispatch = useDispatch()
    const { userId } = useParams()

    const { isConnected } = useContext(SocketContext)
    const { user } = useSelector(state => state.user)
    const { chats, open_chat_id } = useSelector(state => state.chats)
    // const opposite = GetOtherUserData(user._id, selected_chat)

    const open_chat = useMemo(() => {
        if (!open_chat_id) return null
        const chat = chats.find(chat => chat._id === open_chat_id)
        if (chat) return chat
        return { _id: 'new', participants: [user, ] }
    }, [open_chat_id, chats, user])

    function loadMoreMessage() {
        if (!isConnected) return
        dispatch(LoadMoreMessages({ userId }, socket))
    }
    // useEffect(() => {
    //     if (!isConnected) return
    //     dispatch(LoadMessages({ userId }, socket))
    // }, [userId, socket, isConnected])

    return { loadMoreMessage }
}