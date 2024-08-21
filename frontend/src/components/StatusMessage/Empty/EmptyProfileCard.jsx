import { Avatar, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { elevation } from '../../../theme/styles'
import EmptyContainer, { EmptyCard } from './EmptyContainer'

function ProfileCard({ sx = {} }) {
    const theme = useTheme()

    return (
        <EmptyCard
            sx={{
                aspectRatio: '7/10',
                ...sx,
            }}
        >
            <Stack sx={{ height: '60%', width: '100%', bgcolor: 'primary.light', borderRadius: 'inherit', opacity: 0.8 }}>
                <Avatar sx={{ width: '100%', height: '100%', bgcolor: 'transparent', color: theme.palette.primary.main }} />
            </Stack>
            <Stack sx={{ justifyContent: 'space-evenly', flex: 1 }}>
                <Stack sx={{ height: '5px', width: '70%', bgcolor: 'primary.light', borderRadius: '3px' }} />
                <Stack sx={{ height: '5px', width: '60%', bgcolor: 'primary.light', borderRadius: '3px' }} />
                <Stack sx={{ height: '5px', width: '40%', bgcolor: 'primary.light', borderRadius: '3px' }} />
                <Stack sx={{ height: '5px', width: '70%', bgcolor: 'primary.light', borderRadius: '3px' }} />
            </Stack>
            {/* <Skeleton sx={{ height: '60%', width: '100%', bgcolor: 'primary.main', borderRadius: 'inherit' }} /> */}
        </EmptyCard>
    )
}

export default function EmptyProfileCard() {
    return <EmptyContainer value={'No Profiles'} Component={ProfileCard} />
}
