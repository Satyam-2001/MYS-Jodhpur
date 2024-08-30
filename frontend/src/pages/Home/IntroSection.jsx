import React, { Fragment, useEffect, useRef } from 'react'
import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Tilt from 'react-parallax-tilt'
import chroma from 'chroma-js'
import { useNavigate } from 'react-router'
import { elevation } from '../../theme/styles'
import { useScroll, useTransform, motion } from 'framer-motion'

const image_url = ''
// 'https://pikwizard.com/pw/medium/81145461cf9d2348111ba92f037a6823.jpg'


export default function IntroSection({ color = 'primary' }) {
    const navigate = useNavigate()
    const theme = useTheme()

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
                    overflow: 'hidden'
                }}>
                <Grid item xs={12}>
                    <Stack px={2} gap={4} direction='column' sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant='h1' fontWeight={500} sx={{ fontFamily: '"Baloo Bhaijaan 2", sans-serif', color: 'white', transition: 'scale 0.2s', fontSize: { xs: '3.2rem', md: '5.5rem' }, textAlign: 'center', textShadow: `2px 3px ${theme.palette.primary.main}`, '&:hover': { scale: '1.1' } }}>
                            Maheshwari Yuva Sansthan
                        </Typography>
                        <Button variant='contained' onClick={navigateRegisterHandler} size='large' sx={{ boxShadow: elevation(), color: 'white', backgroundImage: 'var(--text-gradient)', borderRadius: '28px', fontSize: '1.4rem', fontWeight: 600, textTransform: 'none' }}>
                            Create account
                        </Button>
                    </Stack>
                </Grid>
            </Grid >
            <Divider />
        </Fragment>
    )
}