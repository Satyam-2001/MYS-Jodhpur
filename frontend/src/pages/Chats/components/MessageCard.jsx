import React from 'react'
import useChats from '../../../hooks/useChats'
import { useSelector } from 'react-redux'
import Block from '../../../UI/Block'
import { Typography } from '@mui/material'

export default function MessageCard({ message, sx = {}, text_color }) {
    const { getSenderFromMessage } = useChats()
    const { user } = useSelector(state => state.user)

    if (!message) return

    const sender = getSenderFromMessage(message)
    const isMe = sender?._id === user._id
    const name = isMe ? 'You' : sender?.basic_info?.name

    return (
        <Block p={1} sx={{ minWidth: '100px', flex: 1, borderLeft: '6px solid', borderColor: sx.color || 'primary.main', ...sx }}>
            <Typography sx={{ color: sx.color || 'primary.main', fontSize: '1rem' }}>
                {name}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: text_color }}>
                {message.text}
            </Typography>
        </Block>
    )
}