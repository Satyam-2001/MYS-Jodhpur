import React from 'react'
import Container from '../Layouts/Container'
import { Typography } from '@mui/material'

export default function Error() {
    return (
        <Container sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: { xs: '2rem', md: '4rem' }, fontWeight: 600 }}>
                404 Not Found
            </Typography>
        </Container>
    )
}
