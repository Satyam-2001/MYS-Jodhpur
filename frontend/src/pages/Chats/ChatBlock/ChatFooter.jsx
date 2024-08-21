import React, { useContext, useState } from 'react'
import { Box, IconButton, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../context/SocketProvider';
import { SendMessage } from '../../../store/ChatSlice';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { useTheme } from '@emotion/react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useChats from '../../../hooks/useChats';
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import CloseIcon from '@mui/icons-material/Close';
import MessageCard from '../components/MessageCard';

function ReplyMessage() {
    const { closeReply } = useChats()
    const { reply_message } = useSelector(state => state.chats)
    if (!reply_message) return
    return (
        <ElevatedStack
            p={1}
            gap={1}
            direction='row'
            sx={{
                backgroundColor: 'action.hover',
                width: '100%',
                alignItems: 'center'
            }}
        >
            <MessageCard message={reply_message} />
            <IconButton size='large' onClick={closeReply}>
                <CloseIcon fontSize='large' />
            </IconButton>
        </ElevatedStack>
    )
}

export default function ChatFooter() {
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext)
    const { user } = useSelector(state => state.user)
    const { reply_message } = useSelector(state => state.chats)
    const { closeReply, sendMessage } = useChats()
    const { userId } = useParams()
    const [value, setValue] = useState('')
    const [openPicker, setOpenPicker] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

    const sendMessageHandler = () => {
        const msg = value && value.trim()
        if (!msg) return
        const message = {
            to: userId,
            from: user._id,
            type: 'Text',
            text: msg,
        }
        setValue('')
        closeReply()
        sendMessage(message)
    }

    const handleEmojiClick = (emoji) => {
        setValue(prop => prop + emoji)
        setOpenPicker(false)
    }

    const toggleOpenPicker = () => {
        setOpenPicker(prop => !prop)
    }

    const keyDownHandler = (event) => {
        if (!isMobile && event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessageHandler()
        }
    }

    return (
        <ElevatedStack
            gap={'6px'}
            p={{ xs: '6px', md: 0 }}
            sx={{
                width: '100%',
                alignItems: 'center',
                borderRadius: { xs: 0, md: '10px' }
            }}
        >
            <Box
                style={{
                    zIndex: 10,
                    position: "fixed",
                    display: openPicker ? "inline" : "none",
                    bottom: 81,
                }}
            >
                <Picker
                    theme={theme.palette.mode}
                    data={data}
                    onEmojiSelect={(emoji) => {
                        handleEmojiClick(emoji.native);
                    }}
                />
            </Box>
            <ReplyMessage />
            <TextField
                variant="filled"
                size='small'
                placeholder='Type a message'
                multiline
                maxRows={5}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{ flex: 1, width: '100%', p: 0 }}
                onKeyDown={keyDownHandler}
                inputProps={{
                    style: {
                        fontSize: '1.1rem',
                        padding: '0px',
                        paddingTop: '0px',
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    sx: { borderRadius: '10px', bgcolor: 'action.hover', p: 0 },
                    startAdornment: (
                        <IconButton size='large' onClick={toggleOpenPicker}>
                            <SentimentSatisfiedOutlinedIcon fontSize='large' />
                        </IconButton>
                    ),
                    endAdornment: (
                        <Stack position="start">
                            <IconButton onClick={sendMessageHandler}>
                                <SendIcon fontSize='large' sx={{ color: value && 'primary.main' }} />
                            </IconButton>
                        </Stack>
                    ),
                }}
            />
        </ElevatedStack>
    )
}
