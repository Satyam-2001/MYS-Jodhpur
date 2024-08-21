import React, { Fragment, useEffect, useRef } from 'react'
import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Tilt from 'react-parallax-tilt'
import chroma from 'chroma-js'
import { useNavigate } from 'react-router'
import { elevation } from '../../theme/styles'
import { useScroll, useTransform, motion } from 'framer-motion'

const image_url = 'https://images.unsplash.com/photo-1615966650071-855b15f29ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXBsZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D'
// 'https://pikwizard.com/pw/medium/81145461cf9d2348111ba92f037a6823.jpg'


export default function IntroSection({ color = 'primary' }) {
    const navigate = useNavigate()

    // const ref = useRef(null);
    const navigateLoginHandler = () => {
        navigate('/login')
    }

    const navigateRegisterHandler = () => {
        navigate('/register')
    }


    return (
        <Fragment>
            <Grid container
                sx={{
                    flexShrink: 0,
                    height: '100vh',
                    p: 2,
                    pt: 8,
                    // boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.2)',
                    // backgroundSize: 'cover',
                    // backgroundPosition: { xs: 'center', md: 'center' },
                    // backgroundImage: `url(${image_url})`,
                    overflow: 'hidden'
                }}>
                <Grid item xs={12}>
                    <Stack px={2} gap={4} direction='column' sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                        <Typography variant='h1' fontWeight={500} sx={{ fontFamily: '"Baloo Bhaijaan 2", sans-serif', color: 'white', cursor: 'pointer', transition: 'scale 0.2s', fontSize: { xs: '2.8rem', md: '5rem' }, color: 'white', textAlign: 'center', '&:hover': { scale: '1.1' } }} m={0}>
                            Maheshwari Yuva Sansthan
                        </Typography>
                        <Button variant='contained' onClick={navigateRegisterHandler} size='large' sx={{ boxShadow: elevation(), color: 'white', backgroundImage: 'var(--text-gradient)', borderRadius: '28px', fontSize: '1.4rem', fontWeight: 600, textTransform: 'none' }}>
                            Create account
                        </Button>
                        {/* <Stack gap={2} direction='column' sx={{ alignItems: 'center', width: { xs: '100%', md: '60%' } }}>
                            <Button variant='contained' fullWidth onClick={navigateLoginHandler} size='large' sx={{ backgroundImage: 'var(--text-gradient)', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 600 }}>
                                Log In
                            </Button>
                            <Button variant='contained' fullWidth onClick={navigateRegisterHandler} size='large' sx={{ backgroundImage: 'var(--text-gradient)', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 600 }}>
                                Register
                            </Button>
                        </Stack> */}
                    </Stack>
                </Grid>
                {/* <Grid item md={6} sx={{ boxSizing: 'border-box', display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                    <Stack sx={{ borderRadius: '50px', backdropFilter: 'blur(4px)', height: '70%', width: '100%', bgcolor: 'rgba(0, 0, 0, 0.1)' }}>

                    </Stack>
                </ Grid> */}
            </Grid >
            <Divider />
        </Fragment>
    )
}