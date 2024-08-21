import React from 'react'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import { Typography, useTheme } from '@mui/material'
import useMessage from '../hooks/useMessage'
import chroma from 'chroma-js'

export default function MessageCard({ message, sx = {}, text_color }) {
    const theme = useTheme()
    const { isMe, sender } = useMessage(message)

    const name = isMe ? 'You' : sender?.basic_info?.name
    const bgcolor = 'background.paper'
    const color = chroma(theme.palette.primary.main).brighten().hex()

    return (
        <ElevatedStack
            elevation={-1}
            sx={{
                p: 1,
                minWidth: '100px',
                flex: 1,
                borderLeft: '6px solid',
                borderColor: color,
                bgcolor,
                color,
                ...sx
            }}>
            <Typography sx={{ color: color, fontSize: '1rem' }}>
                {name}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: text_color }}>
                {message.text}
            </Typography>
        </ElevatedStack>
    )
}