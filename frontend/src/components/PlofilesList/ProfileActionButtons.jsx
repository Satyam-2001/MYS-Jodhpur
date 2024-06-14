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

export function ActionButton({ children, Icon, text, onClick = () => { }, sx = {}, ...props }) {

    const clickHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        onClick(event)
    }

    if (!text) {
        return (
            <Button
                onClick={clickHandler}
                sx={{
                    color: 'primary.main',
                    flex: 1,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    textTransform: 'none', ...sx
                }}
                {...props}
            >
                <Icon sx={{ fontSize: '1.6rem' }} />
                <Typography fontSize={'0.9rem'} sx={{ color: 'primary.main' }}>{children}</Typography>
            </Button>
        )
    }

    return (
        <Button
            onClick={clickHandler}
            fullWidth
            startIcon={<Icon />}
            sx={{
                fontSize: '1rem',
                textTransform: 'none',
                fontFamily: 'Lexend,sans-serif',
                ...sx
            }}
            {...props}
        >
            {children}
        </Button>
    )
}

export function ShortlistButton({ profile, ...props }) {
    const { _id, basic_info = {} } = profile
    const { name, age } = basic_info
    const { user, isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const isMe = user?._id === _id
    const showSaveButton = isLoggedIn && !isMe && basic_info.gender !== user?.basic_info.gender
    const isShortlisted = (user.shortlisted || []).includes(_id)

    const { mutate } = useMutation({
        mutationFn: () => axios.post('/activity', { profileId: _id, type: 'shortlist' }),
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.invalidateQueries(['users', 'shortlist'])
        }
    })

    const clickHandler = () => {
        mutate()
    }

    return (
        <ActionButton {...props} Icon={isShortlisted ? BookmarksIcon : BookmarksOutlinedIcon} onClick={clickHandler}>
            Shortlist
        </ActionButton >
    )
}

export function SendInterestButton({ profile, ...props }) {
    const { _id } = profile
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const isMatchedInterest = (user.matchinterest || []).includes(_id)
    const isRecieveInterest = (user.recieveinterest || []).includes(_id)
    const isSentInterest = (user.sendinterest || []).includes(_id)

    const { mutate } = useMutation({
        mutationFn: ({ type }) => axios.post('/activity', { profileId: _id, type }),
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.invalidateQueries(['users'])
        }
    })

    let content

    if (isMatchedInterest) {
        content = {
            Icon: CloseIcon,
            label: 'Remove Interest',
            clickHandler: () => mutate({ type: 'remove' })
        }
    }
    else if (isRecieveInterest) {
        content = {
            Icon: CheckIcon,
            label: 'Accept Interest',
            clickHandler: () => mutate({ type: 'accept' })
        }
    }
    else if (isSentInterest) {
        content = {
            Icon: UnsubscribeIcon,
            label: 'Cancel Interest',
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
            {isRecieveInterest && (
                <ActionButton Icon={CloseIcon} {...props} onClick={() => mutate({ type: 'decline' })}>
                    Decline Interest
                </ActionButton >
            )}
            <ActionButton Icon={content.Icon} {...props} onClick={content.clickHandler}>
                {content.label}
            </ActionButton >
        </Fragment>
    )
}

export function ShareButton({ profile, ...props }) {
    const { _id } = profile
    const { user } = useSelector(state => state.user)
    const isRecieveInterest = (user.recieveinterest || []).includes(_id)

    if (isRecieveInterest) return

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
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const isRecieveIntrest = (user.recieveintrest || []).includes(_id)

    if (isRecieveIntrest) return

    return (
        <ActionButton Icon={ChatBubbleOutlineOutlinedIcon} onClick={() => navigate(`/chats/${_id}`)} {...props}>
            Chat
        </ActionButton>
    )
}



export default function ProfileActionButtons({ text = true, profile, sx = {}, ...props }) {
    const theme = useTheme()
    const { isLoggedIn } = useSelector(state => state.user)
    if (!isLoggedIn) return
    return (
        <Stack
            direction='row'
            sx={{
                height: '60px',
                borderRadius: '10px',
                flexShrink: 0,
                backgroundColor: chroma(theme.palette.primary.main).alpha(0.1).hex(),
                ...sx
            }}
            {...props}
        >
            <ShortlistButton text={text} profile={profile} />
            <SendInterestButton text={text} profile={profile} />
            <ShareButton text={text} profile={profile} />
            <ChatButton text={text} profile={profile} />
        </Stack>
    )
}
