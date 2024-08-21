import React from 'react'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Stack, Typography, useTheme } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const style = {
    textAlign: 'center', fontSize: { xs: '2rem', sm: '3rem' }, fontFamily: 'Lexend,sans-serif',
}

export function EmptyChatBlockContent({ sx = {} }) {
    const theme = useTheme()

    return (
        <Stack
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                ...sx
            }}
        >
            <ChatBubbleOutlineIcon sx={{ fontSize: { xs: '4rem', sm: '5rem' }, color: 'text.primary' }} />
            <Typography sx={style}>
                Start a <span style={{ color: theme.palette.primary.main }}>Chat</span><br />
                With your <span style={{ color: theme.palette.primary.main }}>Match</span>
            </Typography>
        </Stack>
    )
}

export default function EmptyChatBlock() {
    return (
        <ElevatedStack
            p={1}
            sx={{
                width: '70%',
                height: '100%',
                overflow: 'auto',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <EmptyChatBlockContent />
        </ElevatedStack >
    )
}
