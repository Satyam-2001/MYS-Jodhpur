import React from 'react'
import { Divider, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ChatMenu from './ChatMenu'
import ChatBlock from './ChatBlock'
import Container from '../../components/Layouts/Container'
import { Outlet, useParams } from 'react-router'
import { usePrivateRoute } from '../../hooks/useProtectedRoute'

export default function Chats() {

    const { userId } = useParams()
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

    const header = {
        title: 'Chats',
        goBack: false,
    }

    usePrivateRoute()

    if (isMobile) {
        if (!userId) return <Container header={header} ><ChatMenu /></Container>
        return <Container hideAppBar hideBottomNavBar p={0} pt={0}><Outlet /></Container>
    }

    return (
        <Container gap={2}>
            {/* <ChatBlock user={user} /> */}
            <Outlet />
            <ChatMenu />
        </Container>
    )
}