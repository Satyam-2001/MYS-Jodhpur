import React from 'react'
import SideContainer from '../../components/Layouts/SideContainer'
import SettingCheckInput from './components/SettingCheckInput'
import { Grid } from '@mui/material'

export default function NotificationsSection() {
    const header = {
        title: 'Notifications',
        goBack: true
    }
    return (
        <SideContainer header={header}>
            <Grid container rowSpacing={2} >
                <Grid item xs={12} md={8} >
                    <SettingCheckInput
                        field={'email_notification'}
                        title={'Send Email Notification'}
                        subtitle={"Allow us to send notifications through email abou recieving and accepted interests. By turning it off, you won't receive any informative email from our side."}
                    />
                </Grid>
                <Grid item xs={12} md={8} >
                    <SettingCheckInput
                        field={'chat_notification'}
                        title={'New Message Notification'}
                        subtitle={"Allow us to send notifications whenever you receive a new message from some one. By turninf it off you won't recieve any notification in your website/ app regarding new message."}
                    />
                </Grid>
            </Grid>
        </SideContainer>
    )
}
