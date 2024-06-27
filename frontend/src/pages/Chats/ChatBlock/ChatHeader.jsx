import { Avatar, Divider, IconButton, Menu, MenuItem, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function MenuButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <MenuItem onClick={handleClose}>Delete Chat</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default function ChatHeader({ user }) {
    const navigate = useNavigate()
    if (!user) return
    return (
        <Stack gap={1} direction='row' sx={{ backgroundColor: 'rgba(100, 100, 100, 0.12)', borderRadius: '10px', height: '64px', justifyContent: 'space-between', alignItems: 'center', p: 1, cursor: 'pointer' }}>
            <IconButton onClick={() => navigate('/chats')}>
                <ArrowBackIcon sx={{ fontSize: '1.7rem' }} />
            </IconButton>
            <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none' }}>
                <Stack gap={2} direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Avatar
                        alt={user.basic_info.profile_image}
                        src={user.basic_info.profile_image}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Stack>
                        <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '1.2rem', fontFamily: 'Lexend,sans-serif' }}>
                            {user.basic_info.name}
                        </Typography>
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
        </Stack>
    )
}
