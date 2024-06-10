import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: [],
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChats() {
            
        }
    }
})

export const userActions = chatSlice.actions

export default chatSlice