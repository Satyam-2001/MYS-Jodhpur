import { Button, Divider, Grid, IconButton, Stack, Typography, useTheme, Box, Paper, Skeleton } from '@mui/material'
import parameters, { getParameters } from '../../data/parameters';
import React, { useState } from 'react'
import ProfileImage from '../ProfileImage';
import NameHeader from '../../UI/NameHeader';
import { Link } from 'react-router-dom';
import ProfileActionButtons from './ProfileActionButtons';
import { useSelector } from 'react-redux';
import ParametersGrid from './ParametersGrid';
import { ElevatedStack } from '../../UI/ElevatedComponents';
import ValueCard from '../ValueCard';
import { colors } from '../../data/constants';
import GalleryIconButton from './GalleryIconButton';

export function UserCardListViewSkeleton() {
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <ElevatedStack height={isLoggedIn ? '300px' : '240px'} gap={1} p={1} direction='row' width='100%'>
            <Skeleton animation='wave' variant='rounded' width='220px' height='100%' />
            <Skeleton animation='wave' variant='rounded' sx={{ flex: 1 }} height='100%' />
        </ElevatedStack>
    )
}

export default function UserCardListView({ profile }) {
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <Grid
            item
            md={12}
            sx={{
                height: '300px',
                bgcolor: 'background.paper',
                borderRadius: '10px',
                cursor: 'pointer',
                scrollSnapAlign: 'start',
                mb: 1.5,
                mx: 1,
            }} >
            <ElevatedStack sx={{ height: '100%', p: 1 }}>
                <Link to={`/profile/${profile._id}`} style={{ textDecoration: 'none', height: '100%' }}>
                    <Stack direction='row' sx={{ height: '100%' }}>
                        <ProfileImage profile={profile} sx={{ width: '220px' }} />
                        <Stack pl={2} sx={{ flexGrow: 1, boxSizing: 'border-box' }}>
                            <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                <NameHeader profile={profile} color='text.primary' />
                                <GalleryIconButton profile={profile} size='large' />
                            </Stack>
                            <Divider sx={{ mt: 1 }} />
                            <Stack sx={{ flexGrow: 1 }}>
                                <Grid container pt={2} pb={1} spacing={1.5}>
                                    {getParameters(profile.basic_info || {}).filter(({ list }) => !list).map(({ Icon, value }, index) => {
                                        const color = colors[index % colors.length]
                                        return (
                                            <Grid key={value} item xs={6} sm={4} md={3}>
                                                <ValueCard value={value} Icon={Icon} color={color} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Stack>
                            <ProfileActionButtons profile={profile} />
                        </Stack>
                    </Stack>
                </Link>
            </ElevatedStack>
        </Grid>
    )
}