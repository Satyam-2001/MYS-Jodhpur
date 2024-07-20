import { Avatar, Divider, Stack, Typography, useTheme } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import chroma from 'chroma-js'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { GetOtherUserData } from '../../../store/ChatSlice'
import moment from 'moment'

const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

export default function MenuItem({ chat }) {
    const { user } = useSelector(state => state.user)
    const other_user = GetOtherUserData(user._id, chat)
    const time = chat?.messages?.[0]?.created_at ? moment(new Date(chat.messages?.[0].created_at)).format('hh:mm A') : ''
    const theme = useTheme()

    return (
        <NavLink to={`/chats/${other_user?._id}`} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
                <Stack direction='row' gap={2} sx={{ backgroundColor: isActive ? chroma(theme.palette.primary.main).alpha(0.5).hex() : 'rgba(100, 100, 100, 0.12)', borderRadius: '10px', height: '70px', justifyContent: 'center', alignItems: 'center', p: 1, cursor: 'pointer', '&:hover': { backgroundColor: isActive ? chroma(theme.palette.primary.main).alpha(0.64).hex() : chroma(theme.palette.text.primary).alpha(0.15).hex() } }}>
                    <Avatar
                        alt={user.first_name}
                        src={other_user?.basic_info.profile_image}
                        sx={{ width: 56, height: 56 }}
                    />
                    <Stack sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
                        <Stack direction='row' sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                            <Stack sx={{ justifyContent: 'space-evenly', overflow: 'hidden' }}>
                                <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                                    {`${other_user?.basic_info.name}`}
                                </Typography>
                                <Typography sx={{ fontSize: '0.9rem', opacity: 0.8, textOverflow: 'ellipsis' }}>
                                    {truncateText(chat?.messages?.[0]?.text, 20)}
                                </Typography>
                            </Stack>
                            <Stack gap={1} sx={{ alignItems: 'flex-end' }}>
                                <Typography sx={{ fontSize: '0.9rem', opacity: 0.6 }}>
                                    {time}
                                </Typography>
                                {!!chat.unread && <Typography sx={{ color: 'white', fontSize: '0.9rem', backgroundImage: 'var(--text-gradient)', borderRadius: '50%', width: '1.4rem', height: '1.4rem', textAlign: 'center' }}>
                                    {chat?.unread}
                                </Typography>}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            )}

        </NavLink>

    )
}
