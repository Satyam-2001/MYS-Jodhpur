import React from 'react'
import { Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { ElevatedStack } from '../../../UI/ElevatedComponents';

export default function SearchBar({ value, onChange }) {
    return (
        <ElevatedStack elevation={-1} sx={{ width: '100%' }}>
            <TextField
                variant="filled"
                size='small'
                value={value}
                onChange={onChange}
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
                            <SearchIcon fontSize='large' sx={{ opacity: 0.6 }} />
                        </Stack>
                    ),
                }}
            />
        </ElevatedStack>
    )
}
