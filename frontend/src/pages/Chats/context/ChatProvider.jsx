import { createContext } from "react";

export const ChatContext = createContext([
    
])

export default function ChatProvider({ children }) {
    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    )
}