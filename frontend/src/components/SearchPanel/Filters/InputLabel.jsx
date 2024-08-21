import React from 'react'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import { Typography } from '@mui/material'

export default function InputLabel({ label }) {
    return (
        <ElevatedStack p={1} sx={{ width: '50%', maxWidth: '160px' , alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h4' fontSize={'0.9rem'} sx={{ opacity: 0.6, textTransform: 'capitalize', fontFamily: 'Lexend,sans-serif', textAlign: 'center' }} >
                {label}
            </Typography>
        </ElevatedStack>
    )
}
