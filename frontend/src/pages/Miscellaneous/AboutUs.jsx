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
            <Stack px={{ xs: 2, md: 12 }} pb={4} sx={{ color: 'text.primary', fontWeight: 400, fontSize: '18px' }}>
                Welcome to MYS Shaadi, your trusted partner in finding meaningful connections within the Agarwal community. We are dedicated to helping you find your ideal life partner with a blend of tradition and technology, ensuring that your journey towards a fulfilling relationship is both enriching and enjoyable.
                <br /><br />
                <br />
                <Typography variant='h3' sx={{ fontSize: '32px', fontFamily: 'Lexend,sans-serif', fontWeight: 500 }}>
                    <span class='text-gradient'>Our Mission</span>
                </Typography>
                <br />
                At MYS Shaadi, our mission is to connect Agarwals with their perfect match by providing a platform that combines cultural values with modern technology. We understand the importance of finding someone who shares your beliefs, aspirations, and traditions, and we are here to make that process as smooth and rewarding as possible.
                <br />
                <br />
                <Typography variant='h3' sx={{ fontSize: '32px', fontFamily: 'Lexend,sans-serif', fontWeight: 500 }}>
                    <span class='text-gradient'>Who We Are</span>
                </Typography>
                <br />
                MYS Shaadi is more than just a matrimonial website; it's a community-centric platform designed with the Agarwal traditions and values at its heart. Our team is committed to delivering a top-notch user experience that prioritizes data safety, user privacy, and intuitive design. We believe in fostering genuine connections and making the process of finding the perfect match as effortless and enjoyable as possible.
                <br />
                <br />
                <Typography variant='h3' sx={{ fontSize: '32px', fontFamily: 'Lexend,sans-serif', fontWeight: 500 }}>
                    <span class='text-gradient'>What We Offer</span>
                </Typography>
                <br />
                <ul>
                    <li>
                        <b>Free Chat & Connect Features:</b> Engage in free, unlimited communication with potential matches. Our chat and connect features allow you to build rapport and get to know each other without any barriers.
                        <br /><br /></li>
                    <li>
                        <b>Elegant & User-Friendly Interface:</b> Enjoy a beautifully designed, easy-to-navigate platform that enhances your search for a life partner. Our intuitive UI ensures a smooth and pleasant user experience.
                        <br /><br /></li>
                    <li>
                        <b>Data Safety & Privacy:</b> Your privacy and security are our top priorities. We employ the latest security measures to protect your personal information and ensure a safe environment for all our users.
                        <br /><br /></li>
                    <li>
                        <b>Advanced Search & Matching Algorithms:</b> Find compatible matches quickly with our sophisticated search tools and algorithms tailored to understand and meet your specific preferences and needs.
                        <br /><br /></li>
                    <li>
                        <b>Community-Centric Approach:</b> MYS Shaadi is tailored specifically for the Agarwal community, offering a space where traditions and values are respected and celebrated. Our platform is designed to cater to the unique aspects of our community, ensuring that every match aligns with your cultural and familial expectations.
                        <br /><br /></li>
                </ul>
                <br />
                <Typography variant='h3' sx={{ fontSize: '32px', fontFamily: 'Lexend,sans-serif', fontWeight: 500 }}>
                    <span class='text-gradient'>Our Commitment</span>
                </Typography>
                <br />
                At MYS Shaadi, we are dedicated to creating lasting and meaningful connections within the Agarwal community. Our commitment goes beyond just offering a platform; we strive to provide a supportive environment where every user feels valued and confident in their search for a life partner.
                <br />
                <br />

                Thank you for choosing MYS Shaadi. We are excited to be a part of your journey and look forward to helping you find the perfect match.
                <br />
                <br />

                Join MYS Shaadi today and take the first step towards finding your perfect partner. With our support, you can embark on a journey of love and companionship that aligns with your values and dreams.
                <br /><br />
                <b>Welcome to MYS Shaadi</b> where tradition and technology come together to help you find your soulmate.
            </Stack>
        </Container>
    )
}
