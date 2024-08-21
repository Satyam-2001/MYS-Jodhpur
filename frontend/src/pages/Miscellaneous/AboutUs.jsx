import React from 'react'
import Container from '../../components/Layouts/Container'
import { Stack, Typography } from '@mui/material'

export default function AboutUs() {
    return (
        <Container showFooter hideSideBar pt={11} p={0} gap={2} direction='column' overflow={'auto'}>
            {/* <Stack overflow='auto' px={{ xs: 2, md: 12 }} pb={2} sx={{ color: 'text.primary', fontFamily: 'Lexend,sans-serif', fontWeight: 400 }}> */}
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, textAlign: 'center' }}>
                <span class="text-gradient">About Us</span>
            </Typography>
            <Stack px={{ xs: 2, md: 12 }} pb={4} sx={{ color: 'text.primary', fontFamily: 'sans-serif', fontWeight: 400 }}>
                mys-shaadi.com is a free and modern matrimonial website with all basic services and features for free. Here you can select your chat with interested profiles for free and choose your life partner.
            </Stack>
        </Container>
    )
}
