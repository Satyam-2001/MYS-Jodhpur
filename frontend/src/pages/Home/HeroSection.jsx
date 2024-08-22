import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { Fragment } from 'react'
import ImageSlider from './components/ImageSlider'
import { Link, NavLink } from 'react-router-dom'
import SubContainer from './components/SubContainer'
import ColorBlock from '../../UI/ColorBlock'
import BrowseSection from './BrowseSection'
import MemberSection from './MemberSection'
import SponserSection from './SponserSection'


function MirrorContainer({ children, title, color }) {
    const theme = useTheme()
    const mode = theme.palette.mode
    return (
        <Grid item xs={6} md={3} sx={{ px: 2, py: { xs: 2, md: 0 } }}>
            <ColorBlock color={color} style={{height: '100%'}}>
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
            </ColorBlock>
        </Grid >
    )
}

function SelectionElevatedStack({ to, title, src, direction, color }) {
    const theme = useTheme()

    return (
        <Link to={to} style={{ textDecoration: 'none', flex: 1 }}>
            <Stack direction={{ xs: 'column-reverse', ...direction }} gap={2} sx={{ alignItems: 'center', justifyContent: 'space-between', transition: 'scale 0.2s', '&:hover': { opacity: 1, scale: '1.1' } }}>
                <ColorBlock color={color} style={{ height: 'fit-content', flex: 1, height: '10rem', margin: '0px 20px' }}>
                    <Typography sx={{ fontSize: { xs: '1rem', md: '1.4rem' }, textAlign: 'center' }}>
                        {title}
                    </Typography>
                </ColorBlock>
                <Box sx={{ height: '400px', transition: 'scale 0.2s' }}>
                    <img style={{ height: '100%', objectFit: 'contain' }} src={src} />
                </Box>
            </Stack>
        </Link>
    )
}

function SelectSection() {

    return (
        <Stack direction='row' gap={1} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flex: 1 }}>
            <SelectionElevatedStack direction={{ md: 'row' }} color={'#02b2f7'} title={'Looking For Groom?'} to={'/search?gender=men'} src={require('../../assets/groom.png')} />
            <SelectionElevatedStack direction={{ md: 'row-reverse' }} color={'#fa46fa'} title={'Looking For Bride?'} to={'/search?gender=women'} src={require('../../assets/bride.png')} />
        </Stack>
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
                    Search for a partner which matches your preference
                </MirrorContainer>
                <MirrorContainer color='#f79502' title='Connect'>
                    Send them interest and connect with them
                </MirrorContainer>
                <MirrorContainer color='#02b2f7' title='Interact'>
                    Chat with them for free and interact.
                </MirrorContainer>
            </Grid>
        </Fragment>
    )
}

function CommunitySection() {

    return (
        <Fragment >
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
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
        // SelectSection,
        RegisterSection,
        MemberSection,
        SponserSection,
        CommunitySection,
    ]

    return (
        <Fragment>
            {sub_components.map((Component, index) => {
                return (
                    <SubContainer key={index} bgcolor={(index & 1) ? 'background.default' : 'background.paper'}>
                        <Component />
                    </SubContainer>
                )
            })}
        </Fragment>
    )
}

export default HeroSection