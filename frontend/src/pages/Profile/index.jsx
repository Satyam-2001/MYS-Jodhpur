import React, { useContext, useEffect } from 'react'
import Conatiner from '../../components/Layouts/Container'
import Block from '../../UI/Block'
import { Avatar, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import MainSection, { MainSectionSkeleton } from './MainSection'
import SideSection, { SideSectionSkeleton } from './SideSection'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from '../../services/axiosinstance'
import { ProfileContext, ProfileProvider } from '../../context/ProfileProvider'
import { useSelector } from 'react-redux'

function ProfileComponent() {
    const params = useParams()
    const { user } = useSelector(state => state.user)
    const { profile, updateProfile } = useContext(ProfileContext)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const profileId = params.profileId || user?._id
    const isMe = profileId === user?._id

    const { data: profileData, isPending } = useQuery({
        queryKey: ['profile', profileId],
        queryFn: ({ signal }) => axios.get(`/user/${profileId}`, { signal }),
        enabled: Boolean(profileId)
    })

    useEffect(() => {
        if (isPending) return
        updateProfile(profileData)
    }, [profileData])

    const isLoading = isPending || !profile._id

    return (
        <Conatiner className='hide-scroll-bar' hideSideBar hideBottomNavBar={!isMe && isMobile} hideAppBar={isMobile}>
            <Stack className='hide-scroll-bar' gap={1} width='100%' height='100%' overflow={'auto'} direction={{ xs: 'column', md: 'row' }}>
                {isLoading ? <SideSectionSkeleton /> : <SideSection />}
                {isLoading ? <MainSectionSkeleton /> : <MainSection />}
            </Stack>
        </Conatiner>
    )
}

export default function Profile() {
    return (
        <ProfileProvider>
            <ProfileComponent />
        </ProfileProvider>
    )
}