import React from 'react'
import Container from '../../components/Layouts/Container'
import { Stack, Typography } from '@mui/material'

export default function ContactUs() {
    return (
        <Container showFooter hideSideBar pt={11} p={0} gap={2} direction='column' overflow={'auto'}>
            {/* <Stack overflow='auto' px={{ xs: 2, md: 12 }} pb={2} sx={{ color: 'text.primary', fontFamily: 'Lexend,sans-serif', fontWeight: 400 }}> */}
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, textAlign: 'center' }}>
                <span class="text-gradient">Contact Us</span>
            </Typography>
            <Stack px={{ xs: 2, md: 12 }} pb={4} sx={{ color: 'text.primary', fontFamily: 'Lexend,sans-serif', fontWeight: 400 }}>
                Welcome to MYS Shaadi, your trusted partner in finding meaningful connections. We're here to assist you in every step of your matrimonial journey. If you have any questions, feedback, or need support, please don't hesitate to reach out to us.
                <br />
                <br />
                <Typography variant='h3' sx={{ fontSize: '32px', fontFamily: 'Lexend,sans-serif', fontWeight: 500 }}>
                    <span class='text-gradient'>Contact Details:</span>
                </Typography>
                <ul>
                    <li>
                        <b>Company Name:</b> <a href='https://www.linkedin.com/company/bytesbridge/' target='_blank'>BytesBridge</a>
                    </li>
                    <li>
                        <b>Phone Number:</b> +91 94141 18891
                    </li>
                    <li>
                        <b>Email:</b> bytesbridges@gmail.com
                    </li>
                </ul>
                <br />
                Thank you for choosing MYS Shaadi. We look forward to helping you find your perfect match!
                <br />
                <br />
                Warm regards,
                The MYS Shaadi Team
            </ Stack>.
        </Container>
    )
}
