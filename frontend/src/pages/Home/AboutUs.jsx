import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import NavigateButton from './components/NavigateButton'

export default function AboutUs() {
    return (
        <Stack sx={{ width: '100%', alignItems: 'center', backdropFilter: 'blur(6px)', py: 5, gap: 3 }}>
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center', fontFamily: 'Lexend,sans-serif' }} m={0}>
                About
                <span class="text-gradient"> Us</span><br />
            </Typography>
            <Typography
                sx={{
                    fontSize: '18px',
                    width: { xs: '90%', md: '65%' },
                    textAlign: 'center'
                }}
            >
                At MYS Shaadi, we are dedicated to celebrating and nurturing the rich heritage and values of the Maheshwari community through our innovative matrimonial platform. Our mission is to connect individuals and families seeking meaningful relationships and lifelong partnerships while ensuring a seamless, secure, and enriching experience.
            </Typography>
            <NavigateButton
                to='/aboutus'
            >
                Read More
            </NavigateButton>
        </Stack>
    )
}
