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
            if (!action.payload?.user) {
                state.isLoggedIn = false
                return
            }
            state.isLoggedIn = true
            state.user = action.payload.user
            if (action.payload.set_local === false) return
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        signout(state) {
            state.isLoggedIn = false
            state.user = {}
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        setActivity(state, action) {
            state.user[action.payload.field] = action.payload.data
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    }
})

export const userActions = userSlice.actions

export default userSlice