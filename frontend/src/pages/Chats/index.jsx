import React from 'react'
import { Divider, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ChatMenu from './ChatMenu'
import ChatBlock from './ChatBlock'
import Container from '../../components/Layouts/Container'
import { Outlet, useParams } from 'react-router'

export default function Chats() {

    
    const {userId} = useParams()
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

    if (isMobile) {
        if (!userId) return <Container ><ChatMenu /></Container>
        return <Container hideAppBar hideBottomNavBar><Outlet /></Container>
    }

    return (
        <Container gap={1}>
            {/* <ChatBlock user={user} /> */}
            <Outlet />
            <ChatMenu />
        </Container>
    )
}