import React from 'react'
import { Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <Stack sx={{ width: '100%' }}>
            <TextField
                variant="filled"
                size='small'
                placeholder='Search'
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
