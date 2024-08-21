import { Stack, Typography, styled } from '@mui/material'
import React from 'react'
import { elevation } from '../../../theme/styles'

export const EmptyCard = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: '8%',
    padding: '8px',
    gap: '6px',
    borderColor: theme.palette.primary.light,
    [theme.breakpoints.down('md')]: {
        width: '120px',
        boxShadow: elevation().xs,
    },
    [theme.breakpoints.up('md')]: {
        width: '150px',
        boxShadow: elevation().md,
    }
}))

export default function EmptyContainer({ value, Component }) {
    return (
        <Stack sx={{ flex: 1, gap: 2, position: 'relative', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Stack sx={{ position: 'relative', }}>
                <Component sx={{ zIndex: 100 }} />
                <Component sx={{ position: 'absolute', right: '20px', bottom: '20px' }} />
            </Stack>
            <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, opacity: 0.25, textTransform: 'uppercase', fontFamily: '"Baloo Bhaijaan 2", sans-serif' }}>
                {value}
            </Typography>
        </Stack>
    )
}
