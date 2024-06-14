import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './SearchSlice';
import userSlice from './UserSlice';
import chatSlice from './ChatSlice';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        user: userSlice.reducer,
        chats: chatSlice.reducer,
    },
});

export default store;