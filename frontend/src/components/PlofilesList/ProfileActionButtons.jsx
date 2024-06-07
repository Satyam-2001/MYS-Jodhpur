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

export function SendIntrestButton({ profile, ...props }) {
    const { _id } = profile
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const isMatchedIntrest = (user.matchintrest || []).includes(_id)
    const isRecieveIntrest = (user.recieveintrest || []).includes(_id)
    const isSentIntrest = (user.sendintrest || []).includes(_id)

    const { mutate } = useMutation({
        mutationFn: ({ type }) => axios.post('/activity', { profileId: _id, type }),
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.invalidateQueries(['users'])
        }
    })

    let content

    if (isMatchedIntrest) {
        content = {
            Icon: CloseIcon,
            label: 'Remove Intrest',
            clickHandler: () => mutate({ type: 'remove' })
        }
    }
    else if (isRecieveIntrest) {
        content = {
            Icon: CheckIcon,
            label: 'Accept Intrest',
            clickHandler: () => mutate({ type: 'accept' })
        }
    }
    else if (isSentIntrest) {
        content = {
            Icon: UnsubscribeIcon,
            label: 'Cancel Intrest',
            clickHandler: () => mutate({ type: 'cancel' })
        }
    }
    else {
        content = {
            Icon: ForwardToInboxOutlinedIcon,
            label: 'Send Intrest',
            clickHandler: () => mutate({ type: 'send' })
        }
    }

    return (
        <Fragment>
            {isRecieveIntrest && (
                <ActionButton Icon={CloseIcon} {...props} onClick={() => mutate({ type: 'decline' })}>
                    Decline Intrest
                </ActionButton >
            )}
            <ActionButton Icon={content.Icon} {...props} onClick={content.clickHandler}>
                {content.label}
            </ActionButton >
        </Fragment>
    )
}

export function ChatButton({ profile, ...props }) {
    const { _id } = profile
    const { user } = useSelector(state => state.user)
    const isRecieveIntrest = (user.recieveintrest || []).includes(_id)

    if (isRecieveIntrest) return

    return (
        <ActionButton Icon={ChatBubbleOutlineOutlinedIcon} {...props}>
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
            <SendIntrestButton text={text} profile={profile} />
            <ChatButton text={text} profile={profile} />
        </Stack>
    )
}
