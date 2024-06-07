import React, { useContext } from 'react'
import Block from '../../UI/Block'
import { Avatar, Button, Divider, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material'

import { ProfileContext } from '../../context/ProfileProvider'
import ProfileImage from '../../components/ProfileImage'
import NameHeader from '../../UI/NameHeader'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router'
import ProfileActionButtons, { ChatButton, SendIntrestButton, ShortlistButton } from '../../components/PlofilesList/ProfileActionButtons';
import { useSelector } from 'react-redux';

export function SideSectionSkeleton() {
    return (
        <Block p={1} gap={1} sx={{ flexShrink: 0, width: { xs: '100%', md: '300px' }, height: { xs: '60%', md: '100%' } }} >
            <Skeleton variant='rounded' sx={{ width: '100%', height: { xs: '100%', md: '300px' } }} />
        </Block>
    )
}

export default function SideSection() {
    const theme = useTheme()
    const { profile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = profile?._id === user?._id
    const navigate = useNavigate()
    const gotoPreviousPageHandler = () => {
        navigate('/search')
    }

    return (
        <Block p={1} gap={1} sx={{ flexShrink: 0, width: { xs: '100%', md: '300px' }, height: { xs: '60%', md: '100%' } }} >
            <ProfileImage profile={profile} gradient={true} sx_image={{ justifyContent: 'space-between' }} sx={{ height: { xs: '100%', md: '300px' }, justifyContent: 'space-between' }}>
                <Stack direction={'row'}>
                    <IconButton sx={{ display: { md: 'none' } }} onClick={gotoPreviousPageHandler}>
                        <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                </Stack>
                <Stack gap={1}>
                    <NameHeader profile={profile} sx={{ color: 'white' }} />
                    {!isMe && <Stack sx={{ display: { xs: 'flex', md: 'none' } }}><ProfileActionButtons profile={profile} text={false} /></Stack>}
                </Stack>
            </ProfileImage>
            {/* <ProfileActionButtons profile={profile} direction={'column'} /> */}
            {!isMe && (
                <Stack gap={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <ShortlistButton profile={profile} text={true} variant='contained' />
                    <SendIntrestButton profile={profile} text={true} variant='contained' />
                    <ChatButton profile={profile} text={true} variant='contained' />
                </Stack>
            )}
        </ Block>
    )
}
