import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { Fragment } from 'react'
import ImageSlider from './components/ImageSlider'
import { Link, NavLink } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import Mirror from '../../UI/Mirror'
import chroma from 'chroma-js'
import SubContainer from './components/SubContainer'
import Members from './Members'


function MirrorContainer({ children, title, color }) {
    const theme = useTheme()
    const mode = theme.palette.mode
    return (
        <Grid item md={3} sx={{ px: 2, py: { xs: 2, md: 0 } }}>
            <Tilt
                tiltEnable={false}
                glareEnable={true}
                scale={1.1}
                glareMaxOpacity={0.3}
                glareColor={mode === 'dark' ? 'white' : chroma(color).darken().hex()}
                glarePosition="all"
                glareBorderRadius="10px"
                style={{ borderRadius: '20px' }}
            >
                <Stack sx={{ p: 3, gap: 2, alignItems: 'center', borderRadius: 'inherit', border: 'solid 1px', borderColor: color, backgroundColor: chroma(color).alpha(0.25).hex() }}>
                    <img style={{
                        height: '80px', filter: (mode === 'dark' ? 'invert(100%)' : 'none')
                    }} src={require(`../../assets/community/${title.toLowerCase()}.png`)} />
                    <Typography variant='h2'>
                        {title}
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '1.2rem', textAlign: 'center', color: theme.palette.text.secondary }}>
                        {children}
                    </Typography>
                    {/* <Button variant='contained' size='large' sx={{ backgroundColor: mode === 'dark' ? chroma(color).darken().hex() : color, fontWeight: 500, borderRadius: '20px' }}>
                        Explore
                    </Button> */}
                </Stack>
            </Tilt>
        </Grid >
    )
}


function SelectSection() {

    return (
        <Fragment>
            <Stack direction='row' sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Stack direction='row'>
                    <Link to={'/search?gender=men'}>
                        <Stack direction={{ md: 'row-reverse' }} gap={2} sx={{ '&:hover': { opacity: 1, scale: '1.1' } }}>
                            <Box sx={{ height: '400px', transition: 'scale 0.2s' }}>
                                <img style={{ height: '100%', objectFit: 'contain' }} src={require('../../assets/groom.png')} />
                            </Box>
                        </Stack>
                    </Link>
                    <Link to={'/search?gender=women'}>
                        <Box sx={{ height: '400px', transition: 'scale 0.2s', '&:hover': { opacity: 1, scale: '1.1' } }}>
                            <img style={{ height: '400px', objectFit: 'contain' }} src={require('../../assets/bride.png')} />
                        </Box>
                    </Link>
                </Stack>
            </Stack>
        </Fragment>
    )
}

function RegisterSection() {

    return (
        <Fragment >
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center' }} m={0}>
                Join Our
                <span class="text-gradient"> Community</span><br />
            </Typography>
            <Grid container>
                <MirrorContainer color='red' title='Register'>
                    Create a profile and add your preference for your match
                </MirrorContainer>
                <MirrorContainer color='#17f702' title='Search'>
                    Create a profile and add your preference for your match
                </MirrorContainer>
                <MirrorContainer color='#f79502' title='Connect'>
                    Create a profile and add your preference for your match
                </MirrorContainer>
                <MirrorContainer color='#02b2f7' title='Interact'>
                    Create a profile and add your preference for your match
                </MirrorContainer>
            </Grid>
        </Fragment>
    )
}

function CommunitySection() {

    return (
        <Fragment >
            <Stack p={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center' }} m={0}>
                    Meet Your
                    <span class="text-gradient"> Soul Mate</span><br />
                </Typography>
            </Stack>
            <ImageSlider />
        </Fragment>
    )
}


function HeroSection(props) {

    const sub_components = [
        SelectSection,
        Members,
        RegisterSection,
        CommunitySection,
    ]

    return (
        <Fragment>
            {sub_components.map((Component, index) => {
                return (
                    <SubContainer key={index} color={(index & 1) ? 'primary' : 'secondary'}>
                        <Component />
                    </SubContainer>
                )
            })}
        </Fragment>
    )
}

export default HeroSection