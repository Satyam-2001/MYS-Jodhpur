import React from 'react'
import { Divider, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import logo from '../../assets/logo.png'
import navigationList, { helpNavigationList, legalNavigationList } from '../../data/navigation';

const socials = [
    {
        Icon: InstagramIcon,
        link: 'https://www.instagram.com/'
    },
    // {
    //     Icon: FacebookIcon,
    //     link: 'https://www.facebook.com/Wolfame18/'
    // },
]

function StyledLink({ to, children }) {
    const theme = useTheme()
    return <Link to={to} style={{ textDecoration: 'none' }}>
        <Typography variant='body1' letterSpacing={'1px'} sx={{ opacity: 0.8, ":hover": { color: theme.palette.primary.main, textDecoration: 'underline' } }} >
            {children}
        </Typography>
    </Link>
}

function SocialIconLink({ link, Icon }) {
    const theme = useTheme()

    return (
        <Link to={link} target='_blank' style={{ textDecoration: 'none' }}>
            <Icon fontSize='large' sx={{ opacity: 0.8, color: theme.palette.text.primary, ":hover": { color: theme.palette.primary.main } }} />
        </Link>
    )
}

function LinkStack({ name, navigationList }) {
    return (
        <Grid item xs={6} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack>
                <Typography variant='h3' fontSize={'1.2rem'} fontWeight={700} sx={{ opacity: 0.7, textTransform: 'uppercase' }} >
                    {name}
                </Typography>
                <Stack pt={2} gap={1}>
                    {navigationList.map(({ to, name }) => {
                        return (
                            <StyledLink key={to} to={to}>
                                {name}
                            </StyledLink>)
                    })}
                </Stack>
            </Stack>
        </Grid>
    )
}

function Footer() {

    const theme = useTheme()

    return (
        <Stack sx={{ width: '100%', bgcolor: 'background.paper' }} >
            <Stack sx={{ bgcolor: 'action.hover' }}>
                <Grid spacing={3} container sx={{ p: 4, boxSizing: 'border-box' }}>
                    {/* <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logo} style={{ height: '12rem' }} />
                </Grid> */}
                    <LinkStack name={'Explore'} navigationList={navigationList} />
                    <LinkStack name={'Legal'} navigationList={legalNavigationList} />
                    <LinkStack name={'Help'} navigationList={helpNavigationList} />

                    <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                        <Divider />
                        <Typography variant='h5' fontSize={'1rem'} textAlign={'center'} sx={{ p: 1 }}>
                            Copyright © 2024. All rights reserved by MYS Shaadi.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                        <Typography variant='h5' fontSize={'1.2rem'} textAlign={'center'}>
                            Developed By <Link target='blank' to={'https://www.linkedin.com/company/bytesbridge'} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>Bytes Bridge</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    )
}

export default Footer