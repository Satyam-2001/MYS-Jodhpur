import { Stack, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import SearchBar from './SearchBar'
import MenuItem from './MenuItem'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import { useSelector } from 'react-redux'
import EmptyChatBlock, { EmptyChatBlockContent } from '../EmptyChatBlock'
import { elevation } from '../../../theme/styles'

const filterMenu = [
    { label: 'All', filterFunc: () => true },
    { label: 'Unread', filterFunc: (chat) => chat.unread > 0 },
    { label: 'Matched', filterFunc: (_, user, opposite_user) => user.matchinterest.find(data => data.user === opposite_user._id) },
    { label: 'Received', filterFunc: (_, user, opposite_user) => user.receiveinterest.find(data => data.user === opposite_user._id) },
]

function ChatFilterMenu({ value, handleChange }) {

    return (
        <Stack direction='row' gap={1} sx={{ pb: 1 }}>
            {filterMenu.map((props) => {
                const isSelected = props.label === value.label
                return (
                    <Stack
                        onClick={() => handleChange(props)}
                        key={props.label}
                        sx={{
                            borderRadius: '15px',
                            // boxShadow: elevation(),
                            px: 1.25,
                            py: 0.5,
                            bgcolor: isSelected ? 'primary.light' : 'action.hover',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: isSelected ? 'primary.light' : 'action.focus',
                            }
                        }}
                    >
                        <Typography sx={{ fontSize: '0.9rem' }}>
                            {props.label}
                        </Typography>
                    </Stack>
                )
            })}
        </Stack>
    )
}

export default function ChatMenu() {
    const { chats } = useSelector(state => state.chats)
    const { user } = useSelector(state => state.user)
    const [selectedFilter, setSelectedFilter] = useState(filterMenu[0])
    const [name, setName] = useState('')

    const filteredChatList = useMemo(() => chats.slice().filter(chat => {
        const opposite = chat.participants.find(_user => _user._id !== user._id)
        return opposite?.basic_info?.name?.toLowerCase().includes(name.toLowerCase())
            && selectedFilter.filterFunc(chat, user, opposite)
    }).sort((a, b) => {
        const aLatest = a.messages?.length ? new Date(a.messages[0].created_at).getTime() : 0;
        const bLatest = b.messages?.length ? new Date(b.messages[0].created_at).getTime() : 0;
        // Sort by the latest message timestamp
        return bLatest - aLatest;
    }), [chats, user, selectedFilter, name])

    const isEmpty = filteredChatList.length === 0

    return (
        <ElevatedStack
            gap={1}
            p={1}
            sx={{
                width: { xs: '100%', md: '350px' },
                height: '100%',
                overflow: 'auto',
                justifyContent: 'flex-start'
            }}
        >
            <SearchBar value={name} onChange={(e) => setName(e.target.value)} />
            <ChatFilterMenu value={selectedFilter} handleChange={setSelectedFilter} />
            <Stack gap={0.5} sx={{ flex: 1 }}>
                {!isEmpty && filteredChatList.map((chat) => <MenuItem key={JSON.stringify(chat)} chat={chat} />)}
                {isEmpty && <EmptyChatBlockContent sx={{ display: { md: 'none' } }} />}
            </Stack>
        </ElevatedStack>
    )
}
