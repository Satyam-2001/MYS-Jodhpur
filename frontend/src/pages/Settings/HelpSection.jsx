import React from 'react'
import SideContainer from '../../components/Layouts/SideContainer'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingCard from './components/SettingCard';
import { Grid } from '@mui/material';


export default function HelpSection() {
    const helpList = [
        {
            title: 'Terms Of Use',
            subtitle: 'Terms of using website/app',
            Icon: GavelOutlinedIcon,
            to: '/termsofuse',
        },
        {
            title: 'Privacy Policy',
            subtitle: 'Information which we collect about you',
            Icon: LockOutlinedIcon,
            to: '/privacypolicy',
        },
        {
            title: 'Developer',
            subtitle: 'Contact with the development team',
            Icon: PersonOutlineOutlinedIcon,
            to: 'https://www.linkedin.com/company/bytesbridge',
            target: 'blank',
        }
    ]
    const header = {
        title: 'Help',
        goBack: true
    }

    return (
        <SideContainer header={header}>
            <Grid container rowSpacing={2} >
                {
                    helpList.map((props) => (
                        <Grid key={props.title} item xs={12} md={8} >
                            <SettingCard {...props} />
                        </Grid>
                    ))
                }
            </Grid>
        </SideContainer>
    )
}
