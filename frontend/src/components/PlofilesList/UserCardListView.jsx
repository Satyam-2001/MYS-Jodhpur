import { Button, Divider, Grid, IconButton, Stack, Typography, useTheme, Box, Paper } from '@mui/material'
import parameters, { getParameters } from '../../data/parameters';
import React, { useState } from 'react'
import ProfileImage from '../ProfileImage';
import NameHeader from '../../UI/NameHeader';
import { Link } from 'react-router-dom';
import ProfileActionButtons from './ProfileActionButtons';
import { useSelector } from 'react-redux';
import ParametersGrid from './ParametersGrid';

export default function UserCardListView({ profile }) {
    const theme = useTheme()
    const userInfo = profile?.basic_info || {}
    const image = userInfo.profile_image
    const { isLoggedIn } = useSelector(state => state.user)

    const [isHover, setIsHover] = useState(false)
    return (
        <Grid
            item
            md={12}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            sx={{
                height: isLoggedIn ? '300px' : '240px',
                bgcolor: 'background.paper',
                borderRadius: '10px',
                p: 1,
                cursor: 'pointer',
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