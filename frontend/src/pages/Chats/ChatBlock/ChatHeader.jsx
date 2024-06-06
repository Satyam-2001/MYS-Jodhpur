import { Avatar, Divider, IconButton, Paper, Popover, Stack, Typography, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { Fragment } from 'react'
import SearchBar from '../ChatMenu/SearchBar';
import MessageSent from './MessageSent';

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
    return (
        <Stack direction='row' gap={2} sx={{ backgroundColor: 'rgba(100, 100, 100, 0.12)', borderRadius: '10px', height: '56px', justifyContent: 'center', alignItems: 'center', p: 1, cursor: 'pointer' }}>
            <Avatar
                alt={user.first_name}
                src={user.images[0]}
                sx={{ width: 50, height: 50 }}
            />
            <Stack sx={{ flexGrow: 1, height: '100%' }}>
                <Stack direction='row' sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                    <Stack sx={{ justifyContent: 'space-between', py: 1 }}>
                        <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
                            {`${user.first_name} ${user.last_name}, ${user.age}`}
                        </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                        <IconButton size='large'>
                            <CallIcon fontSize='large' />
                        </IconButton>
                        <MenuButton />
                    </Stack>
                </Stack>
                {/* <Divider /> */}
            </Stack>
        </Stack>
    )
}
