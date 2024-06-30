import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: { data: [], isLoading: true },
}

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats(state, action) {
            state.chats = action.payload
        }
    }
})