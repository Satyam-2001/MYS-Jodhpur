import { Avatar, Divider, IconButton, Menu, MenuItem, Paper, Popover, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import useChats from '../../../hooks/useChats';
import LastSeen from '../../../components/LastSeen';
import { APPBAR_HEIGHT } from '../../../components/Layouts/Header'

function MenuButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { deleteChat } = useChats()
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteChatHandler = () => {
        deleteChat()
        handleClose()
    }

    return (
        <Fragment>
            <IconButton
                id="chat-body-button"
                aria-controls={open ? 'chat-body-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size='large'
                onClick={handleClick}
            >
                <MoreVertIcon fontSize='large' />
            </IconButton>
            <Menu
                id="chat-body-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'chat-body-button',
                }}
            >
                <MenuItem onClick={deleteChatHandler} sx={{ fontSize: '16px' }}>Delete Chat</MenuItem>
                {/* <MenuItem onClick={handleClose} sx={{ fontSize: '16px' }}>Block User</MenuItem> */}
            </Menu>
        </Fragment>
    )
}

export default function ChatHeader({ user }) {
    const navigate = useNavigate()
    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const goBackHandler = () => {
        if (shortScreen) {
            navigate(-1)
        }
        else {
            navigate('../')
        }
    }
    if (!user) return
    return (
        <ElevatedStack
            gap={1}
            direction='row'
            sx={{
                borderRadius: { xs: '0px', md: '10px' },
                bgcolor: 'action.hover',
                height: APPBAR_HEIGHT,
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                cursor: 'pointer',
            }}
        >
            <IconButton onClick={goBackHandler}>
                <ArrowBackIcon sx={{ fontSize: '1.7rem' }} />
            </IconButton>
            <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none' }}>
                <Stack gap={2} direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Avatar
                        alt={'avatar'}
                        src={user.basic_info.profile_image}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Stack gap={0.5}>
                        <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '1.2rem', fontFamily: 'Lexend,sans-serif' }}>
                            {user.basic_info.name}
                        </Typography>
                        <LastSeen user={user} sx={{ color: 'text.primary' }} />
                    </Stack>
                </Stack>
            </Link>
            <Stack direction='row' sx={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Stack direction='row' sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    {/* <IconButton size='large'>
                        <CallIcon fontSize='large' />
                    </IconButton> */}
                    <MenuButton />
                </Stack>
            </Stack>
        </ElevatedStack>
    )
}
