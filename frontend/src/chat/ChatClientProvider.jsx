import { createContext, useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
import axios from '../services/axiosinstance'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from "../services/constant"

export const ChatClienContext = createContext({
    isConnected: false,
    socket: null,
    chats: []
})

export default function ChatClientProvider(props) {

    const { user } = useSelector(state => state.user)
    const [isConnected, setIsConnected] = useState(false)
    const [socket, setSocket] = useState()
    const dispatch = useDispatch()
    const { data: chats } = useQuery({
        queryKey: ['chat', user._id],
        queryFn: () => axios.get('/chat', { params: { user_id: user._id } }),
        enabled: !!user
    })

    useEffect(() => {
        if (!user?._id) return
        const socket = io(BASE_URL, {
            query: `user_id=${user._id}`,
        });
        setSocket(socket)

        socket.on('connect', () => {
            setIsConnected(true)
        })
        socket.on('disconnect', () => {
            setIsConnected(false)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [user?._id])

    useEffect(() => {
        if (!isConnected) return
        socket.on('new_message', (chat, message) => {
            dispatch(ReceiveMessage({ userId: user._id, chat, message }))
        })
        socket.on('updated_message', (message) => {
            dispatch(chatActions.updateMessage(message))
        })
        socket.on('delete_message', (message) => {
            dispatch(chatActions.deleteMessage(message))
        })
        return () => {
            socket.off('new_message')
            socket.off('update_message')
            socket.off('delete_message')
        }
    }, [isConnected])

    useEffect(() => {
        // dispatch(chatActions)
    }, [chats])

    const context_value = {
        isConnected,
        socket
    }

    return (
        <ChatClienContext.Provider value={context_value}>
            {props.children}
        </ChatClienContext.Provider>
    )
}