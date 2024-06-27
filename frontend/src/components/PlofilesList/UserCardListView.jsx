import { Button, Divider, Grid, IconButton, Stack, Typography, useTheme, Box, Paper, Skeleton } from '@mui/material'
import parameters, { getParameters } from '../../data/parameters';
import React, { useState } from 'react'
import ProfileImage from '../ProfileImage';
import NameHeader from '../../UI/NameHeader';
import { Link } from 'react-router-dom';
import ProfileActionButtons from './ProfileActionButtons';
import { useSelector } from 'react-redux';
import ParametersGrid from './ParametersGrid';
import Block from '../../UI/Block';

export function UserCardListViewSkeleton() {
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <Block height={isLoggedIn ? '300px' : '240px'} gap={1} p={1} direction='row' width='100%'>
            <Skeleton variant='rounded' width='220px' height='100%' />
            <Skeleton variant='rounded' sx={{ flex: 1 }} height='100%' />
        </Block>
    )
}

export default function UserCardListView({ profile }) {
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <Grid
            item
            md={12}
            sx={{
                height: isLoggedIn ? '300px' : '240px',
                bgcolor: 'background.paper',
                borderRadius: '10px',
                p: 1,
                cursor: 'pointer',
                scrollSnapAlign: 'start',
                mb: 1,
            }} >
            <Link to={`/profile/${profile._id}`} style={{ textDecoration: 'none' }}>
                <Stack direction='row' sx={{ height: '100%' }}>
                    <ProfileImage profile={profile} sx={{ width: '220px' }} />
                    <Stack pl={2} sx={{ flexGrow: 1, boxSizing: 'border-box' }}>
                        <NameHeader profile={profile} />
                        <Divider sx={{ mb: 1 }} />
                        <Stack sx={{ flexGrow: 1 }}>
                            <ParametersGrid profile={profile} />
                        </Stack>
                        <ProfileActionButtons profile={profile} />
                    </Stack>
                </Stack>
            </Link>
        </Grid>
    )
}