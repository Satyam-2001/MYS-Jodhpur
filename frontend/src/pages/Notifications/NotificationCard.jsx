import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from '../../services/axiosinstance'
import { Avatar, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { formatMessageDate, lastSeenDate } from '../../utils'

export default function NotificationCard({ type, data, date, index }) {

    const isUser = type === 'user'
    const navigate = useNavigate()
    const { data: profile } = useQuery({
        queryKey: ['users', data.user],
        queryFn: ({ signal }) => axios.get(`/user/${data.user}`, { signal, params: { select: 'basic_info' } }),
        enabled: isUser
    })

    const cardClickHandler = () => {
        navigate(`/profile/${profile._id}`)
    }

    return (
        <Stack
            direction='row'
            onClick={cardClickHandler}
            sx={{
                py: 1,
                px: { xs: 1, md: 2 },
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                bgcolor: index & 1 ? 'action.focus' : 'action.selected',
                borderRadius: 2,
                '&:hover': {
                    transform: 'scale(1.01)',
                    bgcolor: 'action.disabled'
                }
                // borderBottom: 1,
                // borderColor: 'divider'
            }}
        >
            <Stack direction='row' sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
                    <Avatar src={profile?.basic_info?.profile_image} sx={{ width: 52, height: 52 }}>
                        {profile?.basic_info?.name}
                    </Avatar>
                    <Stack sx={{ justifyContent: 'space-evenly' }}>
                        <Typography vayiant='h3' sx={{ fontSize: '18px' }}>
                            {profile?.basic_info?.name}
                        </Typography>
                        <Stack direction='row' sx={{ gap: 1 }}>
                            <Typography sx={{ opacity: 0.6 }}>
                                {data.message}
                            </Typography>
                            {/* <Typography sx={{ fontWeight: 600 }}>
                            ·
                        </Typography>
                        <Typography sx={{ opacity: 0.6 }}>
                            {formatMessageDate(date)}
                        </Typography> */}
                        </Stack>
                    </Stack>
                </Stack>

            </Stack>
            <Typography sx={{ fontSize: { md: '15px' } }}>
                {lastSeenDate(date)}
            </Typography>
        </Stack>
    )
}
