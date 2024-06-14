import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"; // Add this
import { LoadChats, ReceiveMessage, chatActions } from "../store/ChatSlice";

export const SocketContext = createContext({
    socket: null,
})

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        if (!user?._id) return
        const new_socket = io('http://localhost:4000/', {
            query: `user_id=${user._id}`,
        });
        setSocket(new_socket)
        dispatch(LoadChats({ userId: user._id }, new_socket))
    }, [user?._id])

    useEffect(() => {
        if (!socket) return
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
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}