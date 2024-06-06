import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: {},
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            if (action.payload?.user) {
                state.isLoggedIn = true
                state.user = action.payload.user
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            }
        },
        signout(state) {
            state.isLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.user = {}
        },
        setActivity(state, action) {
            state.user[action.payload.field] = action.payload.data
        }
    }
})

export const userActions = userSlice.actions

export default userSlice