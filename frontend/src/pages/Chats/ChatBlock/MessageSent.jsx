import React from 'react'
import { IconButton, Stack, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

export default function MessageSent() {
    return (
        <Stack sx={{ width: '100%' }}>
            <TextField
                variant="filled"
                size='small'
                placeholder='Type a message'
                inputProps={{
                    style: {
                        fontSize: '1rem',
                        padding: '12px',
                        // backgroundColor: 'rgba(100, 100, 100, 0.12)'
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    sx: { borderRadius: '10px', backgroundColor: 'rgba(100, 100, 100, 0.12)' },
                    endAdornment: (
                        <Stack position="start">
                            <IconButton>
                                <SendIcon fontSize='large' />
                            </IconButton>
                        </Stack>
                    ),
                }}
            />
        </Stack>
    )
}
