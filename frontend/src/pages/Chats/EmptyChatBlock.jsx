import React from 'react'
import Block from '../../UI/Block'
import { Typography, useTheme } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const style = {
    textAlign: 'center', fontSize: '3rem', fontFamily: 'Lexend,sans-serif',
}

export default function EmptyChatBlock() {
    const theme = useTheme()
    return (
        <Block
            p={1}
            sx={{
                width: '70%',
                height: '100%',
                overflow: 'auto',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: '5rem', color: 'text.primary' }} />
            <Typography sx={style}>
                Start a <span style={{ color: theme.palette.primary.main }}>Chat</span><br />
                With your <span style={{ color: theme.palette.primary.main }}>Match</span>
            </Typography>
        </Block >
    )
}
