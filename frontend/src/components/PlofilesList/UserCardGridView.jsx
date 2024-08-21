import { Box, Grid, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import ReactCardFlip from "react-card-flip";
import { getParameters } from '../../data/parameters';
import React, { useState } from 'react'
import ProfileImage from '../ProfileImage';
import NameHeader from '../../UI/NameHeader';
import { Link } from 'react-router-dom';
import { ElevatedStack } from '../../UI/ElevatedComponents';
import ProfileActionButtons from './ProfileActionButtons';
import ParametersGrid from './ParametersGrid';
import { elevation } from '../../theme/styles';
import GalleryIconButton from './GalleryIconButton';

const style = {
    borderRadius: '10px',
    height: '100%',
    maxHeight: '600px',
    minHeight: '350px',
    flex: 1,
    width: { xs: '100%', md: '48%' },
    minWidth: 'min(100%, 280px)',
    maxWidth: '380px !important',
}

export function UserCardGridViewSkeleton({ sx = {} }) {
    return (
        <ElevatedStack p={1} gap={1} sx={{ ...style, ...sx }} >
            <Skeleton animation='wave' variant="rounded" width='100%' sx={{ flex: 1 }} />
            <Skeleton animation='wave' variant="rounded" height={60} width='100%' />
        </ElevatedStack>
    )
}

export default function UserCardGridView({ profile, sx = {} }) {
    const userInfo = profile.basic_info
    return (
        <Grid
            item
            xs={12}
            md={3.8}
            // md={3}
            sx={{
                ...style, scrollSnapAlign: 'start', cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                mb: 1,
                boxShadow: elevation(),
                ...sx,
            }}
        >
            <Stack sx={{
                // p: 1,
                height: '100%'
            }}>
                <Link
                    to={`/profile/${profile._id}`}
                    style={{
                        textDecoration: 'none',
                        flexGrow: 1, // Take remaining space in the Grid item
                        overflow: 'auto'
                    }}
                >
                    <ProfileImage
                        gradient={true}
                        profile={profile}
                        sx={{ height: '100%', flexShrink: 1 }}
                    >
                        <Stack direction='row' sx={{ gap: 2, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <NameHeader profile={profile} sx={{ color: 'white' }} />
                            <GalleryIconButton profile={profile} sx={{ color: 'white' }} />
                        </Stack>
                        <ParametersGrid profile={profile} color='white' />
                        <ProfileActionButtons text={false} profile={profile} sx={{ height: { sm: '40px', md: '70px' } }} />
                    </ProfileImage>
                </Link>
            </Stack>
        </Grid>
    )
}