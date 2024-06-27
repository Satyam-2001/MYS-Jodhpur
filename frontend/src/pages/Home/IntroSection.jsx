import React, { Fragment } from 'react'
import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Tilt from 'react-parallax-tilt'
import chroma from 'chroma-js'
import { useNavigate } from 'react-router'


export default function IntroSection({ color = 'primary' }) {
    const navigate = useNavigate()

    const navigateLoginHandler = () => {
        navigate('/login')
    }

    const nagigateRegisterHandler = () => {
        navigate('/register')
    }

    return (
        <Fragment>
            <Grid container sx={{
                flexShrink: 0,
                height: '100vh',
                p: 2,
                pt: 12,
                boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.2)',
                backgroundSize: 'cover',
                backgroundPosition: { xs: 'center', md: 'inherit' },
                backgroundImage: 'url(https://img.freepik.com/free-photo/indian-couple-celebrating-propose-day-by-being-romantic-with-each-other_23-2151110911.jpg?t=st=1716188729~exp=1716192329~hmac=c8be8967d90706140b34ce1156a21e7ad1193032f018471994c34b1f47462fa1&w=900)',
            }}>
                <Grid item md={6}>
                    <Stack px={2} gap={2} direction='column' sx={{ justifyContent: 'center' }}>
                        <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', color: 'white' }} m={0}>
                            Find Your<br />
                            <span class="text-gradient">Dream Partner</span><br />
                            Easily!
                        </Typography>
                        <Stack gap={2} direction='column' sx={{ alignItems: 'center', width: { xs: '100%', md: '60%' } }}>
                            <Button variant='contained' fullWidth onClick={navigateLoginHandler} size='large' sx={{ backgroundImage: 'var(--text-gradient)', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 600 }}>
                                Log In
                            </Button>
                            <Button variant='contained' fullWidth onClick={nagigateRegisterHandler} size='large' sx={{ backgroundImage: 'var(--text-gradient)', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 600 }}>
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item md={6} sx={{ boxSizing: 'border-box', display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <img src={require('../../assets/logo.png')} /> */}
                </ Grid>
            </Grid >
            <Divider />
        </Fragment>
    )
}