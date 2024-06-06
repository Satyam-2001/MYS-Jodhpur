import React from 'react'
import { Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../../../store/SearchSlice';

export default function SearchBar() {
    const { search } = useSelector(state => state.search)
    const dispatch = useDispatch()
    const searchChangeHandler = (e) => {
        dispatch(searchActions.setSearch(e.target.value))
    }
    return (
        <Stack sx={{ flexGrow: 1 }}>
            <TextField
                variant="filled"
                size='small'
                placeholder='Search your right match'
                value={search}
                onChange={searchChangeHandler}
                inputProps={{
                    style: {
                        fontSize: '1rem',
                        padding: '8px',
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    sx: { borderRadius: '10px' },
                    startAdornment: (
                        <Stack position="start">
                            <SearchIcon fontSize='large' />
                        </Stack>
                    ),
                }}
            />
        </Stack>
    )
}
