import { Box, Grid, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import ReactCardFlip from "react-card-flip";
import { getParameters } from '../../data/parameters';
import React, { useState } from 'react'
import ProfileImage from '../ProfileImage';
import NameHeader from '../../UI/NameHeader';
import { Link } from 'react-router-dom';
import Block from '../../UI/Block';
import ProfileActionButtons from './ProfileActionButtons';
import ParametersGrid from './ParametersGrid';

const style = {
    borderRadius: '10px',
    height: '100%',
    maxHeight: '600px',
    minHeight: '350px',
    width: { xs: '100%', md: '48%' },
    minWidth: 'min(100%, 320px)',
    maxWidth: '380px !important',
}

export function UserCardGridViewSkeleton() {
    return (
        <Block p={1} gap={1} sx={style} >
            <Skeleton variant="rounded" width='100%' sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={60} width='100%' />
        </Block>
    )
}

export default function UserCardGridView({ profile, sx = {} }) {
    const userInfo = profile.basic_info
    const image = userInfo.profile_image
    return (
        <Grid
            item
            xs={12}
            md={3.9}
            sx={{
                bgcolor: 'background.paper',
                p: 1,
                cursor: 'pointer',
                mb: 1,
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                ...style,
                ...sx
            }}
        >
            <Link
                to={`/profile/${profile._id}`}
                style={{
                    textDecoration: 'none',
                    flexGrow: 1, // Take remaining space in the Grid item
                    overflow: 'auto',
                    paddingBottom: '6px',
                }}
            >
                <ProfileImage
                    gradient={true}
                    profile={profile}
                    sx={{ height: '100%', flexShrink: 1 }}
                    sx_image={{}}
                >
                    <NameHeader profile={profile} sx={{ color: 'white' }} />
                    <ParametersGrid profile={profile} color='white' />
                </ProfileImage>
            </Link>
            <ProfileActionButtons text={false} profile={profile} sx={{ height: { md: '70px' } }} />
        </Grid>
    )
}