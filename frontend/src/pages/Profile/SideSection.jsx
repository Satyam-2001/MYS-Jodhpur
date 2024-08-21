import React, { useContext, useEffect, useRef, useState } from 'react'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Avatar, Button, Divider, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material'

import { ProfileContext } from '../../context/ProfileProvider'
import ProfileImage from '../../components/ProfileImage'
import NameHeader from '../../UI/NameHeader'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import { useNavigate } from 'react-router'

import ProfileActionButtons, { ShareButton, SendInterestButton, ShortlistButton } from '../../components/PlofilesList/ProfileActionButtons';
import { useSelector } from 'react-redux';
import { ElevatedIconButton } from '../../UI/ElevatedComponents'

import { motion } from 'framer-motion'

function SideSectionContainer({ children, sx = {} }) {
    return (
        <ElevatedStack
            sx={{
                p: { xs: 0, md: 1 },
                gap: 1,
                overflow: { xs: 'hidden' },
                borderRadius: { xs: 0, md: '10px' },
                flexShrink: 0,
                width: { xs: '100%', md: '325px' },
                height: { xs: '60%', md: '100%' },
                ...sx
            }}
        >
            {children}
        </ElevatedStack>
    )
}

export function SideSectionSkeleton() {
    return (
        <SideSectionContainer sx={{ p: 1 }}>
            <Skeleton animation='wave' variant='rounded' sx={{ width: '100%', height: { xs: '100%', md: '300px' } }} />
        </SideSectionContainer>
    )
}

export default function SideSection() {
    const theme = useTheme()
    const { profile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = profile?._id === user?._id
    const navigate = useNavigate()

    const gotoPreviousPageHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        navigate(-1)
    }

    const gotoBiodata = (event) => {
        event.stopPropagation()
        event.preventDefault()
        navigate(`/profile/${profile?._id}/biodata`)
    }

    return (
        <SideSectionContainer>
            <ProfileImage profile={profile} gradient={true} sx_image={{ justifyContent: 'space-between' }} sx={{ borderRadius: 'inherit', height: { xs: '100%', md: '300px' }, justifyContent: 'space-between' }}>
                <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                    <IconButton sx={{ color: 'white', borderRadius: '50%', '&:hover': { backdropFilter: 'blur(4px)', color: 'primary.main' } }} onClick={gotoPreviousPageHandler}>
                        <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '1.6rem' }} />
                    </IconButton>
                    <IconButton sx={{ color: 'white', borderRadius: '50%', '&:hover': { backdropFilter: 'blur(4px)', color: 'primary.main' } }} onClick={gotoBiodata}>
                        <FilePresentOutlinedIcon sx={{ fontSize: '1.6rem' }} />
                    </IconButton>
                </Stack>
                <Stack gap={1} sx={{ flex: 1, justifyContent: 'flex-end' }}>
                    <NameHeader profile={profile} sx={{ color: 'white' }} />
                    {!isMe && <Stack sx={{ display: { xs: 'flex', md: 'none' } }}><ProfileActionButtons profile={profile} text={false} /></Stack>}
                </Stack>
            </ProfileImage>
            {
                !isMe && (
                    <Stack gap={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <ProfileActionButtons text={false} profile={profile} />
                    </Stack>
                )
            }
        </ SideSectionContainer >
    )
}
