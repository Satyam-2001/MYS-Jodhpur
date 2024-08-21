import { Avatar, Badge, Divider, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import chroma from 'chroma-js'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { GetOtherUserData } from '../../../store/ChatSlice'
import moment from 'moment'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import { formatMessageDate, timeFormat } from '../../../utils'
import { online_color } from '../../../components/LastSeen'

const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

function formatLastMessageTime(time) {
    if (!time) return ''
    const day = formatMessageDate(time)
    if (day !== 'Today') return day
    return timeFormat(time)
}

export default function MenuItem({ chat }) {
    const { user } = useSelector(state => state.user)
    const other_user = GetOtherUserData(user._id, chat)
    const time = formatLastMessageTime(chat?.messages?.[0]?.created_at)
    const theme = useTheme()

    return (
        <NavLink to={`/chats/${other_user?._id}`} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
                <ElevatedStack
                    elevation={isActive ? -1 : 1}
                    direction='row'
                    gap={2}
                    sx={{
                        bgcolor: isActive ? chroma(theme.palette.primary.main).alpha(0.5).hex() : 'action.hover',
                        borderRadius: '10px',
                        height: '66px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: { xs: 0.75, md: 1 },
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: isActive ? chroma(theme.palette.primary.main).alpha(0.7).hex() : chroma(theme.palette.text.primary).alpha(0.05).hex(),
                            transform: 'scale(1.02)'
                        }
                    }}
                >
                    <Badge
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        color='primary'
                        overlap="circular"
                        variant='dot'
                        sx={{
                            '& .MuiBadge-dot': {
                                width: '12px',      // Change the size of the dot
                                height: '12px',     // Change the size of the dot
                                borderRadius: '50%',
                                backgroundColor: other_user?.status === 'online' ? online_color : 'transparent', // Custom dot color
                            },
                        }}
                    >
                        <Avatar
                            alt={user.first_name}
                            src={other_user?.basic_info.profile_image}
                            sx={{ width: 54, height: 54 }}
                        />
                    </Badge>
                    <Stack sx={{ flexGrow: 1, height: '100%', overflow: 'hidden', justifyContent: 'space-evenly' }}>
                        <Stack direction='row' sx={{ justifyContent: 'space-between', overflow: 'hidden' }}>
                            <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                                {`${other_user?.basic_info.name}`}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', opacity: 0.6 }}>
                                {time}
                            </Typography>
                        </Stack>
                        <Stack direction='row' sx={{ justifyContent: 'space-between', overflow: 'hidden' }}>
                            <Typography sx={{ fontSize: '0.9rem', opacity: 0.8, textOverflow: 'ellipsis' }}>
                                {truncateText(chat?.messages?.[0]?.text, 20)}
                            </Typography>
                            {!!chat.unread && <Typography sx={{ color: 'white', fontSize: '0.9rem', bgcolor: 'primary.main', borderRadius: '50%', width: '1.4rem', height: '1.4rem', textAlign: 'center' }}>
                                {chat?.unread}
                            </Typography>}
                        </Stack>

                    </Stack>
                </ElevatedStack>)}
        </NavLink>

    )
}
