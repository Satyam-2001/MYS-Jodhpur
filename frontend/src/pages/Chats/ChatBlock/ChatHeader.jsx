import { Avatar, Divider, IconButton, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function MenuButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Fragment>
            <IconButton size='large' onClick={handleClick}>
                <MoreVertIcon fontSize='large' />
            </IconButton>
            <Popover
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper elevation={2}>
                    <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                </Paper>
            </Popover>
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
                    <IconButton size='large'>
                        <CallIcon fontSize='large' />
                    </IconButton>
                    <MenuButton />
                </Stack>
            </Stack>
        </Stack>
    )
}
