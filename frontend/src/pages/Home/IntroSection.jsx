import React, { Fragment } from 'react'
import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Tilt from 'react-parallax-tilt'
import Mirror from '../../UI/Mirror'
import chroma from 'chroma-js'
import { useNavigate } from 'react-router'

function FeatureContainer({ children, color }) {
    const theme = useTheme()
    const mode = theme.palette.mode
    return (
        <Tilt
            tiltEnable={false}
            glareEnable={true}
            scale={1.1}
            glareMaxOpacity={0.3}
            glareColor={mode === 'dark' ? 'white' : chroma(color).darken().hex()}
            glarePosition="all"
            glareBorderRadius="10px"
            style={{ borderRadius: '10px', width: '100%', padding: '8px', paddingLeft: '12px', backgroundColor: chroma(color).alpha(0.4).hex() }}
        >
            <Typography sx={{ fontSize: '20px', color: 'white' }}>
                {children}
            </Typography>
        </Tilt>
    )
}

function SelectInput({ label, value, menu }) {
    return (
        <FormControl fullWidth>
            <InputLabel sx={{ color: 'white' }} id="select-input-label">{label}</InputLabel>
            <Select
                id="select-input"
                value={value}
                label={label}
                sx={{
                    color: "white",
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)',
                    },
                    '.MuiSvgIcon-root ': {
                        fill: "white !important",
                    }
                }}
            >
                {menu.map((label) => <MenuItem value={label}>{label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default function IntroSection({ color = 'primary' }) {
    const navigate = useNavigate()

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
                        <Stack gap={2} sx={{ alignItems: 'center', width: { xs: '100%', md: '60%' } }}>
                            <Button variant='contained' onClick={nagigateRegisterHandler} size='large' sx={{ backgroundImage: 'var(--text-gradient)', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 600 }}>
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