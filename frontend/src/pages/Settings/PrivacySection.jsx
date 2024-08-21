import React from 'react'
import SideContainer from '../../components/Layouts/SideContainer'
import { Grid } from '@mui/material'
import SettingsSelectInput from './components/SettingSelectInput'
import SettingCheckInput from './components/SettingCheckInput'

export default function PrivacySection() {
    const header = {
        title: 'Privacy',
        goBack: true
    }

    return (
        <SideContainer header={header}>
            <Grid container rowSpacing={2} >
                <Grid item xs={12} md={8} >
                    <SettingCheckInput field={'show_activity_status'} title={'Show Activity Status'} subtitle={"Allow accounts to see when you were last active or are currently active. When this is turned off, other accounts won't be able to see the activity status of your account."} />
                </Grid>
                <Grid item xs={12} md={8} >
                    <SettingsSelectInput field={'contact_visibility'} title={'Who can see my contact details?'} />
                </Grid>
                <Grid item xs={12} md={8} >
                    <SettingsSelectInput field={'name_visibility'} title={'Who can see my name?'} />
                </Grid>
                <Grid item xs={12} md={8} >
                    <SettingsSelectInput field={'image_visibility'} title={'Who can see my images?'} />
                </Grid>
            </Grid>
        </SideContainer>
    )
}
