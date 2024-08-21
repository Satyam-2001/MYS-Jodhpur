import React, { useContext, useEffect } from 'react'
import Conatiner from '../../components/Layouts/Container'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Avatar, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import MainSection, { MainSectionSkeleton } from './MainSection'
import SideSection, { SideSectionSkeleton } from './SideSection'
import { Outlet, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from '../../services/axiosinstance'
import { ProfileContext, ProfileProvider } from '../../context/ProfileProvider'
import { useSelector } from 'react-redux'
import { APPBAR_HEIGHT } from '../../components/Layouts/Header'

function ProfileComponent() {
    const { isMe, profile, isPending } = useContext(ProfileContext)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Conatiner className='hide-scroll-bar' hideSideBar hideBottomNavBar={!isMe && isMobile} hideAppBar={isMobile} p={0} pt={{ xs: 0, md: `${APPBAR_HEIGHT + 12}px` }}>
            <Stack className='hide-scroll-bar' gap={{ md: 2 }} px={{ md: 2 }} pb={{ md: 2 }} width='100%' height={{ xs: 'auto', md: '100%' }} direction={{ xs: 'column', md: 'row' }} sx={{ overflow: 'auto', display: { xs: 'block', md: 'flex' } }}>
                {isPending ? <SideSectionSkeleton /> : <SideSection />}
                {isPending ? <MainSectionSkeleton /> : <MainSection />}
            </Stack>
        </Conatiner>
    )
}

export default function Profile() {
    return (
        <ProfileProvider>
            <Outlet />
            <ProfileComponent />
        </ProfileProvider>
    )
}