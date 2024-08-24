import { Button, IconButton, Stack, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from '../services/axiosinstance';
import { queryClient } from '../services/http';
import { userActions } from '../store/UserSlice';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { ElevatedIconButton } from './ElevatedComponents';
import LastSeen from '../components/LastSeen';
import { RWebShare } from 'react-web-share';
import ShareIcon from '@mui/icons-material/Share';

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function ShareButton({ profile }) {
    return (
        <ElevatedIconButton sx={{ bgcolor: 'transparent' }}
            onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
            }} >
            <RWebShare
                data={{
                    text: 'Share Profile',
                    url: `${window.location.protocol}//${window.location.host}/profile/${profile._id}`,
                    title: profile.name,
                }}
                onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                }}
            >

                <ShareIcon sx={{ fontSize: '1.3rem', color: 'white' }} />
            </RWebShare >
        </ElevatedIconButton>
    )
}

export default function NameHeader({ hideActivityStatus = false, hideShortlistIcon = false, isPending: isLoading = false, profile = {}, sx = {}, color = 'white' }) {

    const { _id, basic_info = {} } = profile
    const { name, date_of_birth } = basic_info
    const age = getAge(date_of_birth)
    const { user, isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const isMe = user?._id === _id
    const showSaveButton = isLoggedIn && !isMe && basic_info?.gender !== user?.basic_info?.gender
    const [isShortlisted, setIsShortlisted] = useState(user.shortlisted?.find(data => data.user === _id))

    useEffect(() => {
        const findUser = user.shortlisted?.find(data => data.user === _id)
        setIsShortlisted(findUser)
    }, [user.shortlisted])

    const { mutate, isPending } = useMutation({
        mutationFn: () => axios.post('/activity', { profileId: _id, type: 'shortlist' }),
        onMutate: () => {
            setIsShortlisted(prop => !prop)
        },
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.invalidateQueries(['users', 'shortlist'])
        },
        onError: () => {
            setIsShortlisted(prop => !prop)
        }
    })

    const clickHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        mutate()
    }

    return (
        <Stack direction='row' gap={2} sx={{ alignItems: 'flex-start' }}>
            <Stack>
                <Typography
                    variant='body1'
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        ...sx,
                        '&:hover': {
                            color: 'primary.main',
                            // background: 'var(--text-gradient)',
                            // WebkitTextFillColor: 'transparent',
                            // WebkitBackgroundClip: 'text'
                        }
                    }}>
                    {!isLoading ? `${name}, ${age}` : 'Loading...'}
                </Typography>
                {!isMe && !isLoading && !hideActivityStatus && <LastSeen user={profile} sx={sx} />}
            </Stack>
            {showSaveButton && !isLoading && !hideShortlistIcon && <ElevatedIconButton disabled={isPending} sx={{ bgcolor: 'transparent' }} onClick={clickHandler}>
                {isShortlisted ? <StarIcon sx={{ fontSize: '1.4rem', color: 'primary.main' }} /> : <StarOutlineIcon sx={{ fontSize: '1.6rem', color }} />}
            </ElevatedIconButton>
            }
            {isMe && <ShareButton profile={profile} />}
        </Stack>
    )
}
