import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import chroma from 'chroma-js';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/http';
import { userActions } from '../../store/UserSlice';
import axios from '../../services/axiosinstance'
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import CheckIcon from '@mui/icons-material/Check';
import { Fragment } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import { Link, useNavigate } from 'react-router-dom';
import { ElevatedStack } from '../../UI/ElevatedComponents';

function userFind(array, userId) {
    return array?.find(data => data.user == userId)
}

export function ActionButton({ children, Icon, text, onClick = () => { }, sx = {}, ...props }) {

    const theme = useTheme()

    const clickHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        onClick(event)
    }

    return (
        <ElevatedStack
            onClick={clickHandler}
            fullWidth
            startIcon={<Icon />}
            direction={text ? 'row' : 'column'}
            gap={text ? 1 : 0.25}
            sx={{
                flex: 1,
                py: '4px',
                bgcolor: chroma(theme.palette.primary.main).alpha(0.2).hex(),
                backdropFilter: 'blur(2px)',
                fontSize: text ? '1rem' : '0.72rem',
                textTransform: 'none',
                fontFamily: 'Lexend,sans-serif',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'primary.main',
                ...sx,
                '&:hover': {
                    transform: text ? 'scale(1.04)' : 'scale(1.08)'
                }
            }
            }
            {...props}
        >
            <Icon />
            {children}
        </ElevatedStack >
    )
}

export function ShortlistButton({ profile, ...props }) {
    const { _id, basic_info = {} } = profile
    const { name, age } = basic_info
    const { user, isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const isMe = user?._id === _id
    const showSaveButton = isLoggedIn && !isMe && basic_info?.gender !== user?.basic_info?.gender
    const isShortlisted = userFind(user.shortlisted, _id)
    const navigate = useNavigate()

    const gotoLogin = () => {
        navigate('/login')
    }

    const { mutate } = useMutation({
        mutationFn: () => axios.post('/activity', { profileId: _id, type: 'shortlist' }),
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.invalidateQueries(['users', 'shortlist'])
        }
    })

    const clickHandler = () => {
        if (!isLoggedIn) {
            gotoLogin()
        }
        else {
            mutate()
        }
    }

    return (
        <ActionButton {...props} Icon={isShortlisted ? BookmarksIcon : BookmarksOutlinedIcon} onClick={clickHandler}>
            Shortlist
        </ActionButton >
    )
}

export function SendInterestButton({ profile, ...props }) {
    const { _id } = profile
    const { user, isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const isMatchedInterest = userFind(user.matchinterest, _id)
    const isReceiveInterest = userFind(user.receiveinterest, _id)
    const isSentInterest = userFind(user.sendinterest, _id)
    const navigate = useNavigate()


    const { mutate } = useMutation({
        mutationFn: ({ type }) => axios.post('/activity', { profileId: _id, type }),
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.invalidateQueries(['users'])
        }
    })

    const gotoLogin = () => {
        navigate('/login')
    }

    let content

    if (isMatchedInterest) {
        content = {
            Icon: CloseIcon,
            label: 'Unmatch',
            clickHandler: () => mutate({ type: 'remove' })
        }
    }
    else if (isReceiveInterest) {
        content = {
            Icon: CheckIcon,
            label: 'Accept Interest',
            clickHandler: () => mutate({ type: 'accept' })
        }
    }
    else if (isSentInterest) {
        content = {
            Icon: UnsubscribeIcon,
            label: 'Unsend Interest',
            clickHandler: () => mutate({ type: 'cancel' })
        }
    }
    else {
        content = {
            Icon: ForwardToInboxOutlinedIcon,
            label: 'Send Interest',
            clickHandler: () => mutate({ type: 'send' })
        }
    }

    return (
        <Fragment>
            {isReceiveInterest && (
                <ActionButton Icon={CloseIcon} {...props} onClick={isLoggedIn ? () => mutate({ type: 'decline' }) : gotoLogin}>
                    Decline Interest
                </ActionButton >
            )}
            <ActionButton Icon={content.Icon} {...props} onClick={isLoggedIn ? content.clickHandler : gotoLogin}>
                {content.label}
            </ActionButton >
        </Fragment>
    )
}

export function ShareButton({ profile, ...props }) {
    const { _id } = profile
    const { user } = useSelector(state => state.user)
    const isReceiveInterest = userFind(user.receiveinterest, _id)

    if (isReceiveInterest) return

    return (
        <RWebShare
            data={{
                text: 'Share Profile',
                url: `${window.location.protocol}//${window.location.host}/profile/${profile._id}`,
                title: profile.name,
            }}
        >
            <ActionButton Icon={ShareIcon} {...props}>
                Share
            </ActionButton>
        </RWebShare>
    )
}

export function ChatButton({ profile, ...props }) {
    const { _id } = profile
    const { user, isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()
    const isReceiveIntrest = (user.receiveintrest || []).includes(_id)

    if (isReceiveIntrest) return

    const gotoLogin = () => {
        navigate('/login')
    }

    const clickHandler = () => {
        if (isLoggedIn) {
            navigate(`/chats/${_id}`)
        }
        else {
            gotoLogin()
        }
    }

    return (
        <ActionButton Icon={ChatBubbleOutlineOutlinedIcon} onClick={clickHandler} {...props}>
            Chat
        </ActionButton>
    )
}



export default function ProfileActionButtons({ text = true, profile, sx = {}, ...props }) {
    const theme = useTheme()
    const { isLoggedIn } = useSelector(state => state.user)
    return (
        <Stack
            elevation={1}
            direction='row'
            gap={text ? 2 : 1}
            sx={{
                py: '4px',
                height: '60px',
                borderRadius: '10px',
                flexShrink: 0,
                // backgroundColor: chroma(theme.palette.primary.main).alpha(0.1).hex(),
                // backdropFilter: 'blur(2px)',
                ...sx
            }}
            {...props}
        >
            {/* <ShortlistButton text={text} profile={profile} /> */}
            <SendInterestButton text={text} profile={profile} />
            <ShareButton text={text} profile={profile} />
            <ChatButton text={text} profile={profile} />
        </Stack>
    )
}
