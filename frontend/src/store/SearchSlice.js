import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
    filters: {},
    filter_open: false,
    view_style: 'list',
}


const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload
        },
        toggleFilter(state) {
            state.filter_open = !state.filter_open
        },
        setViewStyle(state, action) {
            state.view_style = action.payload
        }
    }
})

export const searchActions = searchSlice.actions

export default searchSlice