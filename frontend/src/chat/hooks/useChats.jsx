import { useContext } from "react";
import { ChatClienContext } from "../ChatClientProvider";
import { useSelector } from "react-redux";

export default function useChats() {
    const { user } = useSelector(state => state.user)
    const { chats, socket } = useContext(ChatClienContext)

    function openChat(chat_id) {
        
    }

    function createChat({ type = 'personal', participants = [], user_id }) {
        if (type === 'personal') {
            if (!user_id) {
                throw 'You should provide User Id to create Chat'
            }
            if (participants.length > 1) {
                throw 'For Personal Chat there must be a single participant'
            }
            socket.emit('create_chat', { type, participants: [user._id, user_id] }, () => {

            })
        }
    }

    return { chats, createChat, openChat }
}