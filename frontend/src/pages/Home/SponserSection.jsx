import { Stack, Typography } from '@mui/material'
import sponserImg from '../../assets/sponser.jpeg'
import React from 'react'

export default function SponserSection() {
    return (
        <>
            <Stack sx={{ alignItems: 'center', gap: 3 }}>
                <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center' }} m={0}>
                    <span class="text-gradient">Sponsored </span>
                    By
                </Typography>
                <Stack component={'img'} src={sponserImg} sx={{maxWidth: {xs: '90%', md: '75%'}}} />
            </Stack>
        </>
    )
}
