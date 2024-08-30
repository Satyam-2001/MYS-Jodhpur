import { Box, Divider, Grid, Stack, Typography, useTheme, styled, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { Fragment } from 'react'
import SubContainer from './components/SubContainer'
import ColorBlock from '../../UI/ColorBlock'

function MirrorContainer({ children, title, color }) {
    const theme = useTheme()
    const mode = theme.palette.mode
    return (
        <Grid item xs={12} sm={6} md={3} sx={{ px: 2, py: { xs: 2, md: 0 } }}>
            <ColorBlock color={color} style={{ height: '100%' }}>
                <img style={{
                    height: '70px', filter: (mode === 'dark' ? 'invert(100%)' : 'none')
                }} src={require(`../../assets/community/${title.toLowerCase()}.png`)} />
                <Typography variant='h2'>
                    {title}
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '1.2rem', textAlign: 'center', color: theme.palette.text.secondary }}>
                    {children}
                </Typography>
            </ColorBlock>
        </Grid >
    )
}

export default function RegisterSection() {

    return (
        <SubContainer >
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center', fontFamily: 'Lexend,sans-serif' }} m={0}>
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
        </SubContainer>
    )
}