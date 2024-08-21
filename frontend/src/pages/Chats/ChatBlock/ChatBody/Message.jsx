import { Box, CircularProgress, Divider, IconButton, Menu, MenuItem, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
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
import { useSwipeable } from 'react-swipeable';
import useChats from '../../../../hooks/useChats'
import useMessage from '../../hooks/useMessage'
import { ElevatedStack } from '../../../../UI/ElevatedComponents'

export function Message({ message }) {
    const [isHover, setIsHover] = useState(false)
    const { isMe, time, readByAll: read, setReply } = useMessage(message)
    const theme = useTheme()
    const bgcolor = isMe ? 'primary.main' : 'background.paper'
    const color = isMe && 'white'
    const card_bgcolor = isMe ? 'rgba(0, 0, 0, 0.4)' : 'background.paper'
    const card_color = isMe ? chroma(theme.palette.primary.main).brighten().hex() : 'primary.main'
    const isLoading = message.status === 'loading'

    const [swipe, setSwipe] = useState(0)

    const handlers = useSwipeable({
        onSwiping: (event) => {
            if (event.dir === 'Right') {
                setSwipe(event.absX)
            }
        },
        onTouchEndOrOnMouseUp: () => {
            if (swipe > 30) {
                setReply()
            }
            setSwipe(0)
        }
    })

    return (
        <Box
            {...handlers}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Stack direction={isMe ? 'row-reverse' : 'row'} gap='4px' alignItems={'center'}>
                <ElevatedStack
                    elevation={1}
                    sx={{
                        ml: !isMe ? Math.min(swipe / 20, 15) : 0,
                        mr: isMe ? Math.max(-swipe / 30, -7) : 0,
                        p: 1,
                        bgcolor,
                        minWidth: `50px`,
                        maxWidth: '80%',
                        borderRadius: '20px',
                        borderBottomLeftRadius: !isMe && '0px',
                        borderBottomRightRadius: isMe && '0px',
                        alignItems: 'flex-end',
                        cursor: 'pointer',
                        alignItems: !message.reply ? 'center' : 'flex-start',
                        gap: 1,
                    }}
                >
                    {message?.reply && <MessageCard message={message.reply} text_color={color} sx={{ bgcolor: card_bgcolor, color: card_color }} />}
                    <Typography sx={{ fontSize: '1rem', color,  whiteSpace: 'pre-wrap' }}>
                        {message.text}
                    </Typography>
                </ElevatedStack>
                <MessageMenu visible={isHover} message={message} bgcolor={bgcolor} color={color} onClose={() => setIsHover(false)} />
            </Stack>
            <Stack direction='row' gap={1} mt={'4px'} alignItems='center' justifyContent={isMe ? 'flex-end' : 'flex-start'}>
                <Typography sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                    {time}
                </Typography>
                {isMe && !isLoading && <DoneAllIcon sx={{ fontSize: '1.2rem', color: read ? '#53BDEB' : 'text.primary' }} />}
                {isLoading && <CircularProgress sx={{ width: '1rem !important', height: '1rem !important', color: '#53BDEB' }} />}
            </Stack>
        </Box>
    )
}