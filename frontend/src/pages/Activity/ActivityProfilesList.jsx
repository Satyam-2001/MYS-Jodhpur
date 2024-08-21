import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import ProfilesList from '../../components/PlofilesList'
import axios from '../../services/axiosinstance'
import { IconButton, Stack, Typography } from '@mui/material'
import Container from '../../components/Layouts/Container'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/UserSlice'

export default function ActivityProfilesList({ title, url }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: profileList, isPending } = useQuery({
        queryKey: ['users', url],
        queryFn: ({ signal }) => axios.get(`/activity/${url}`, { signal }),
    })

    useEffect(() => {
        if (isPending) return;
        dispatch(userActions.setActivity({ field: url, data: profileList.map((data) => ({ ...data, user: data.user._id })) }))
    }, [profileList, isPending])

    const header = {
        title,
        goBack: true
    }

    return (
        <Container direction='column' header={header} gap={1.5}>
            <ElevatedStack p={1} direction='row' alignItems={'center'} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton onClick={() => navigate('../')}>
                    <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '1.4rem' }} />
                </IconButton>
                <Typography sx={{ fontSize: '1.4rem', px: 1, fontFamily: 'Lexend,sans-serif' }}>{title} ({profileList?.length || 0})</Typography>
            </ElevatedStack>
            <ProfilesList profilesList={profileList?.map(data => data.user) || []} isPending={isPending} />
        </Container>
    )
}