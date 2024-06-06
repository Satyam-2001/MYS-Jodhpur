import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './SearchSlice';
import userSlice from './UserSlice';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        user: userSlice.reducer
    },
});

export default store;