import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"; // Add this
import { LoadChats, ReceiveMessage, chatActions } from "../store/ChatSlice";
import { BASE_URL } from "../services/constant";

export const SocketContext = createContext({
    isConnected: false,
    socket: null,
})

export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false)
    const [socket, setSocket] = useState()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

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
            socket.off('connection')
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

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}