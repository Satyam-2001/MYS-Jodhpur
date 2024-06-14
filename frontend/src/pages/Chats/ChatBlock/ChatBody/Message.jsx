import { Divider, IconButton, Menu, MenuItem, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import chroma from 'chroma-js'
import { SocketContext } from '../../../../context/SocketProvider';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useParams } from 'react-router';
import MessageCard from '../../components/MessageCard';
import { MessageMenu } from './MessageMenu'
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

export function Message({ message }) {
    const [isHover, setIsHover] = useState(false)
    const { socket } = useContext(SocketContext)
    const { user } = useSelector(state => state.user)
    const isMe = message.from === user?._id
    const time = moment(new Date(message.created_at)).format('hh:mm A')
    const read = message?.readBy?.find(({ participant }) => message.to === participant)
    const theme = useTheme()
    const bgcolor = isMe ? 'primary.main' : theme.palette.mode === 'dark' ? 'background.paper' : 'background.default'
    const color = isMe && 'white'
    const card_bgcolor = isMe ? 'rgba(0, 0, 0, 0.4)' : chroma(theme.palette.background.paper).alpha(0.9).hex()
    const card_color = isMe ? chroma(theme.palette.primary.main).brighten().hex() : 'primary.main'

    const isLoading = message.status === 'loading'

    useEffect(() => {
        if (!socket || read || isMe) return
        socket.emit('read_message', { messageId: message._id })
    }, [message._id, isMe, socket, read])

    return (
        <Stack
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            direction={isMe ? 'row-reverse' : 'row'}
            sx={{ justifyContent: 'flex-start', width: '100%', alignItems: 'flex-start' }}
        >
            <Stack gap='4px'>
                <Stack direction={isMe ? 'row-reverse' : 'row'} gap='4px' alignItems={'center'}>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 1,
                            bgcolor,
                            minWidth: '50px',
                            borderRadius: '20px',
                            borderBottomLeftRadius: !isMe && '0px',
                            borderBottomRightRadius: isMe && '0px',
                            alignItems: 'flex-end',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: !message.reply ? 'center' : 'flex-start',
                            gap: 1,
                        }}
                    >
                        <MessageCard message={message?.reply} text_color={color} sx={{ bgcolor: card_bgcolor, color: card_color }} />
                        <Typography sx={{ fontSize: '1rem', color }}>
                            {message.text}
                        </Typography>
                    </Paper>
                    <MessageMenu visible={isHover} message={message} bgcolor={bgcolor} color={color} onClose={() => setIsHover(false)} />
                </Stack>
                <Stack direction='row' gap={1} alignItems='center' justifyContent={isMe ? 'flex-end' : 'flex-start'}>
                    <Typography sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                        {time}
                    </Typography>
                    {isMe && !isLoading && <DoneAllIcon sx={{ fontSize: '1.2rem', color: read ? '#53BDEB' : 'text.primary' }} />}
                    {isLoading && <HourglassBottomOutlinedIcon sx={{ fontSize: '1.2rem', color: '#53BDEB' }} />}
                </Stack>
            </Stack>
        </Stack>
    )
}