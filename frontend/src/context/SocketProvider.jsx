import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"; // Add this
import { LoadChats, ReceiveMessage, chatActions } from "../store/ChatSlice";
import { BASE_URL } from "../services/constant";
import { userActions } from "../store/UserSlice";

export const SocketContext = createContext({
    isConnected: false,
    socket: null,
})

export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false)
    const { open_chat_id, chats } = useSelector(state => state.chats)
    const [socket, setSocket] = useState()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    function getUserFromChat(userId, chatId) {
        const chat = chats.find((chat) => chat._id === chatId)
        if (!chat) return
        const user = chat?.participants?.find(item => item._id != userId)
        return user
    }

    useEffect(() => {
        if (!user?._id) return
        const authToken = localStorage.getItem('token')
        if (!authToken) {
            dispatch(userActions.signout())
            return;
        }
        const socket = io(BASE_URL, {
            query: { token: `Bearer ${authToken}` },
        });
        setSocket(socket)

        socket.on('connect', () => {
        })
        socket.on('verified', (data) => {
            setIsConnected(true)
        })
        socket.on('disconnect', () => {
            setIsConnected(false)
        })

        return () => {
            socket.off('connect')
            socket.off('verified')
            socket.off('disconnect')
        }
    }, [user?._id])

    useEffect(() => {
        if (!isConnected) return
        socket.on('read_chat', (userId, chatId) => {
            dispatch(chatActions.readChat({ userId, chatId }))
        })
        socket.on('updated_message', (message) => {
            dispatch(chatActions.updateMessage(message))
        })
        socket.on('delete_message', (message) => {
            dispatch(chatActions.deleteMessage(message))
        })
        socket.on('delete_chat', (chatId) => {
            dispatch(chatActions.deleteChat(chatId))
        })
        return () => {
            socket.off('read_chat')
            socket.off('update_message')
            socket.off('delete_message')
            socket.off('delete_chat')
        }
    }, [isConnected])

    useEffect(() => {
        if (!isConnected) return;
        socket.on('new_message', (message) => {
            const chatId = message.chatId
            const userId = user._id
            dispatch(ReceiveMessage({ userId, message }, socket))
            if (chatId === open_chat_id) {
                socket.emit('read_chat', chatId, () => {
                    dispatch(chatActions.readChat({ userId, chatId }))
                })
            }
            else {
                if (!user.settings.chat_notificaton) return
                const _user = getUserFromChat(userId, chatId)
                if (userId === _user?._id) return;
                if (!_user) {
                    showNotification({ title: 'New Message', body: 'You may receive a new message' })
                }
                showNotification({ title: _user?.basic_info?.name || 'User', body: message?.text, icon: _user?.basic_info?.profile_image })
            }
        })
        return () => {
            socket.off('new_message')
        }
    }, [open_chat_id, isConnected, user, chats])

    useEffect(() => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                }
            });
        }
    }, []);

    const showNotification = ({ title, body, icon }) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon
            });
        }
    };

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}