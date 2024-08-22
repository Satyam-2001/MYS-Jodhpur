import React from 'react'
import Container from '../../components/Layouts/Container'
import { Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import NotificationCard from './NotificationCard'
import { Heading } from '../../theme/styles'
import SideContainer from '../../components/Layouts/SideContainer'

export default function Notifications() {
    const notifications = useSelector(state => state.user.user.notifications)
    const header = {
        title: 'Notifications',
        goBack: true
    }
    return (
        <SideContainer header={header} style={{ p: { xs: 0, md: 1 } }}>
            {!!notifications?.length && <Stack sx={{ gap: '3px' }}>
                {notifications?.map((notification, index) => <NotificationCard key={notification.date} index={index} {...notification} />)}
            </Stack>}
            {!notifications?.length && <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '1.3rem', opacity: 0.6, fontFamily: 'Lexend,sans-serif' }}>No Notifications Yet</Typography>
            </Stack>}
        </SideContainer>
    )
}
