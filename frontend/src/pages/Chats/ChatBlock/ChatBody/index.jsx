import { Divider, IconButton, Menu, MenuItem, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import useInfiniteScroll from 'react-easy-infinite-scroll-hook';
import { SocketContext } from '../../../../context/SocketProvider';
import { LoadMoreMessages } from '../../../../store/ChatSlice';
import { useParams } from 'react-router';
import { Message } from './Message';
import { formatMessageDate } from '../../../../utils';


export default function ChatBody() {

    const dispatch = useDispatch()
    const { userId } = useParams()
    const { socket } = useContext(SocketContext)
    const { selected_messages, total_messages } = useSelector(state => state.chats)


    const loadMoreMessages = () => {
        if (!socket) return
        dispatch(LoadMoreMessages({ userId }, socket))
    }

    const scrollRef = useInfiniteScroll({
        next: loadMoreMessages,
        rowCount: total_messages,
        hasMore: { up: total_messages > selected_messages.length, down: false },
        reverse: { column: true },
    });

    useEffect(() => {
        if (scrollRef.current.lastElementChild) {
            const newMessageHeight = scrollRef.current.lastElementChild.offsetHeight + 50
            const visibleHeight = scrollRef.current.offsetHeight
            const containerHeight = scrollRef.current.scrollHeight
            const scrollOffSet = scrollRef.current.scrollTop + visibleHeight
            if (containerHeight - newMessageHeight <= scrollOffSet) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
        }
    })

    const messagesWithDates = [];
    let lastDate = null;

    for (let i = selected_messages.length - 1; i >= 0; i--) {
        const message = selected_messages[i];
        const messageDate = moment(message.created_at).startOf('day');

        if (!lastDate || !messageDate.isSame(lastDate, 'day')) {
            messagesWithDates.push({
                type: 'date',
                date: formatMessageDate(message.created_at)
            });
            lastDate = messageDate;
        }

        messagesWithDates.push({
            type: 'message',
            message
        });
    }

    messagesWithDates.reverse();

    return (
        <Stack className='hide-scroll-bar' ref={scrollRef} gap={1} p={1} direction={'column-reverse'} sx={{ flexGrow: 1, overflow: 'auto' }}>
            {messagesWithDates.map((data, index) => {
                if (data.type === 'date') {
                    return (
                        <Divider>
                            <Typography sx={{ fontSize: '1rem', fontFamily: 'Lexend,sans-serif', opacity: 0.8 }}>
                                {data.date}
                            </Typography>
                        </Divider>
                    )
                }
                return <Message key={data.message._id} message={data.message} />
            })}
        </Stack>
    )
}
