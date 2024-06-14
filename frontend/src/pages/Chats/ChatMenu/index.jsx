import { Stack } from '@mui/material'
import React from 'react'
import SearchBar from './SearchBar'
import MenuItem from './MenuItem'
import Block from '../../../UI/Block'
import { useSelector } from 'react-redux'
import { GetChats } from '../../../store/ChatSlice'

export default function ChatMenu() {
    const { chats } = useSelector(state => state.chats)

    return (
        <Block
            gap={1}
            p={1}
            sx={{
                width: { xs: '100%', md: '350px' },
                height: '100%',
                overflow: 'auto',
                justifyContent: 'flex-start'
            }}
        >
            <SearchBar />
            <Stack gap='3px' flexDirection={'column-reverse'}>
                {chats.map((chat) => <MenuItem chat={chat} />)}
            </Stack>
        </Block>
    )
}
