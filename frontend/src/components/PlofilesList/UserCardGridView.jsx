import { Grid, Stack, Typography, useTheme } from '@mui/material'
import ReactCardFlip from "react-card-flip";
import { getParameters } from '../../data/parameters';
import React, { useState } from 'react'
import ProfileImage from '../ProfileImage';
import NameHeader from '../../UI/NameHeader';
import { Link } from 'react-router-dom';
import Block from '../../UI/Block';
import ProfileActionButtons from './ProfileActionButtons';
import ParametersGrid from './ParametersGrid';

export default function UserCardGridView({ profile }) {
    const theme = useTheme()
    const userInfo = profile.basic_info
    const image = userInfo.profile_image
    const [isHover, setIsHover] = useState(false)
    // const [flip, setFlip] = useState(false)
    return (

        <Grid item
            xs={12}
            md={5.8}
            sx={{
                bgcolor: 'background.paper',
                borderRadius: '10px',
                height: '100%',
                maxHeight: '600px',
                minHeight: '350px',
                width: '48%',
                maxWidth: '380px !important',
                p: 1,
                cursor: 'pointer',
                mb: 1,
                // scrollSnapStop: 'always', 
                scrollSnapAlign: 'start'
            }}
        >
            <Link to={`/profile/${profile._id}`} style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }} >
                <ProfileImage gradient={true} profile={profile} sx={{ flex: 1, height: undefined, flexShrink: 1 }} sx_image={{}}>
                    <NameHeader profile={profile} sx={{ color: 'white' }} />
                    <ParametersGrid profile={profile} color='white' />
                </ProfileImage>
                <ProfileActionButtons text={false} profile={profile} />
            </Link>
        </Grid >
    )
}