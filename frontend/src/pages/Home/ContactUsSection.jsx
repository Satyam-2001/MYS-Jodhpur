import React from 'react'
import SubContainer from './components/SubContainer'
import circle_bg from '../../assets/circle_bg.png'
import { Button, Stack, Typography } from '@mui/material'
import NavigateButton from './components/NavigateButton'

export default function ContactUsSection() {
    return (
        <SubContainer>
            <Stack
                sx={{
                    backgroundImage: `url(${circle_bg})`, // Corrected syntax
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'fit', // Optional: to ensure the background covers the entire area
                    height: '320px',
                    width: '100%',
                    display: 'flex', // Optional: for centering content
                    alignItems: 'center', // Optional: vertically center content
                    justifyContent: 'center', // Optional: horizontally center content
                    color: 'white', // Optional: text color for better contrast
                    textAlign: 'center', // Optional: center text alignment
                    gap: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '56px', md: '68px' },
                        fontWeight: 500,
                        fontFamily: 'Lexend,sans-serif'
                    }}
                >
                    Contact <span class='text-gradient'>Us</span>
                </Typography>
                <Typography
                    sx={{
                        fontSize: '18px',
                        fontFamily: 'Lexend,sans-serif',
                        width: { md: '50%' }
                    }}
                >
                    Sign up with us to find your star connection. From profile matching tips to choosing your ideal match, we will help you in this journey!
                </Typography>
                <NavigateButton to='/contactus'>
                    Meet Us
                </NavigateButton>
            </Stack>
        </SubContainer>
    )
}
