import { CircularProgress, Divider, IconButton, Menu, MenuItem, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { SocketContext } from '../../../../context/SocketProvider';
import { LoadMoreMessages } from '../../../../store/ChatSlice';
import { useParams } from 'react-router';
import { Message } from './Message';
import { formatMessageDate } from '../../../../utils';

function DateDivider({ date }) {
    return (
        <Divider >
            <Typography sx={{ fontSize: '1rem', fontFamily: 'Lexend,sans-serif', opacity: 0.8 }}>
                {date}
            </Typography>
        </Divider>
    )
}


export default function ChatBody() {

    const dispatch = useDispatch()
    const { userId } = useParams()
    const { socket, isConnected } = useContext(SocketContext)
    const { chats, open_chat_id, loading } = useSelector(state => state.chats)

    const chat = chats?.find((chat) => chat._id === open_chat_id)
    const selected_messages = chat?.messages || []
    const total_messages = chat?.total || 0
    const hasMore = total_messages > selected_messages.length


    const loadMoreMessages = () => {
        if (!isConnected) return
        dispatch(LoadMoreMessages({ userId }, socket))
    }

    const [sentryRef, { scrollRef }] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: loadMoreMessages,
    });

    const messagesWithDates = useMemo(() => {
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
        return messagesWithDates;
    }, [selected_messages])


    return (
        <Stack className='hide-scroll-bar' ref={scrollRef} gap={1} p={1} direction={'column-reverse'} sx={{ flex: 1, overflow: 'auto' }}>
            {messagesWithDates.map((data, index) => {
                if (data.type === 'date') {
                    return <DateDivider key={data.date} date={data.date} />
                }
                return <Message key={data.message._id} {...data} />
            })}
            {hasMore && <Stack ref={sentryRef} sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', py: 2 }}>
                <CircularProgress color="primary" />
            </Stack>}
        </Stack>
    )
}
