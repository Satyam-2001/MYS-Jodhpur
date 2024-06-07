import { Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserCardGridView, { UserCardGridViewSkeleton } from '../../components/PlofilesList/UserCardGridView'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axiosinstance'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ActivityCardView({ profileId }) {
    const { data: profile, isPending } = useQuery({
        queryKey: ['users', profileId],
        queryFn: ({ signal }) => axios.get(`/user/${profileId}`, { signal, params: { select: 'basic_info' } }),
    })

    if (!profile) return
    if (isPending || !profile?.basic_info) {
        return <UserCardGridViewSkeleton />
    }
    return <UserCardGridView profile={profile} sx={{ height: '100%', width: '100%' }} />
}

function Carousel({ list }) {
    const [itemIndex, setItemIndex] = useState(0)
    const length = list?.length
    const forwardHandler = () => {
        setItemIndex(prop => prop + 1)
    }
    const backWardHandler = () => {
        setItemIndex(prop => prop - 1)
    }
    return (
        <Stack sx={{ width: '100%', height: '70vh', position: 'relative', alignItems: 'center' }}>
            {(itemIndex > 0) && (
                <IconButton onClick={backWardHandler} sx={{ position: 'absolute', left: { xs: 0, md: '10%' }, top: '50%', translate: '-50% -50%' }}>
                    <ArrowBackIosIcon fontSize='large' />
                </IconButton>)
            }
            <ActivityCardView profileId={list[itemIndex]} />
            {(itemIndex < list.length - 1) && (
                <IconButton onClick={forwardHandler} sx={{ position: 'absolute', right: { xs: 0, md: '10%' }, top: '50%', translate: '50% -50%' }}>
                    <ArrowForwardIosIcon fontSize='large' />
                </IconButton>)
            }
        </Stack>
    )
}

export default function ActivityCards({ data, isPending, field, title }) {
    const { user } = useSelector(state => state.user)
    const profileList = user?.[field]
    if (isPending || profileList.length == 0) { return }
    return (
        <Stack gap={1} p={1}>
            <Typography sx={{ fontSize: '1.5rem', px: 1, fontFamily: 'Lexend,sans-serif' }}>{title}</Typography>
            <Carousel list={profileList} />
        </Stack>
    )
}
