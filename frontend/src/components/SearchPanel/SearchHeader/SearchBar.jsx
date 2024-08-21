import React from 'react'
import { Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import { elevation } from '../../../theme/styles';

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchValue = searchParams.get('search') || ''

    const searchChangeHandler = (e) => {
        const value = e.target.value
        setSearchParams((searchParams) => {
            if (value) searchParams.set('search', value)
            else searchParams.delete('search')
            return searchParams
        })
    }
    return (
        <Stack sx={{ flexGrow: 1, boxShadow: elevation(-1), borderRadius: '10px' }}>
            <TextField
                variant="filled"
                size='small'
                placeholder='Search your right match'
                value={searchValue}
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
                            <SearchIcon fontSize='large' sx={{ opacity: 0.6 }} />
                        </Stack>
                    ),
                }}
            />
        </Stack>
    )
}
