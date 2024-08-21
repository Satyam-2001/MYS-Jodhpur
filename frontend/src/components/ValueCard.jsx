import React from 'react'
import { ElevatedStack } from '../UI/ElevatedComponents'
import RadialEffect from '../UI/RadialEffect'
import { Typography, Link } from '@mui/material'
import chroma from 'chroma-js'

export default function ValueCard({ value, color, to, Icon, sx = {} }) {
    let component = (
        <ElevatedStack
            direction='row'
            gap={2}
            sx={{
                cursor: 'pointer',
                height: '55px',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 1, md: 1.5 },
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.06)'
                },
                ...sx,
            }}>
            <RadialEffect color={color} />
            <Typography
                fontSize={'0.9rem'}
                fontFamily={'Lexend,sans-serif'}
                fontWeight={350}
                sx={{ color: to ? 'primary.main' : 'text.primary' }}
            >
                {value}
            </Typography>
            <Icon sx={{ fontSize: 22, color: chroma(color).alpha(0.7).hex() }} />
        </ElevatedStack>
    )

    if (to) {
        return <Link href={to.startsWith('http') ? to : `http://${to}`} target='_blank' rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>{component}</Link>
    }

    return component
}
