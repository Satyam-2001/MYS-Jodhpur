import { Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import useChats from '../../../../hooks/useChats';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomModal from '../../../../UI/CustomModal';
import { formatMessageDate, timeFormat } from '../../../../utils';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import useMessage from '../../hooks/useMessage';

function ReadReceipt({ icon, title, time }) {
    const formatted_time = time ? `${formatMessageDate(time)} at ${timeFormat(time)}` : '-'
    return (
        <Stack gap={1}>
            <Stack gap={1} direction='row'>
                {icon}
                <Typography sx={{ fontSize: '1rem' }}>
                    {title}
                </Typography>
            </Stack>
            <Typography sx={{ fontSize: '0.9rem', opacity: 0.8 }}>
                {formatted_time}
            </Typography>
        </Stack>
    )
}

function MessageInfoModal({ open, onClose, message }) {
    const { user } = useSelector(state => state.user)
    if (!open) return
    const readReceipt = message.readBy.find(({ participant }) => participant !== message.from)
    const readAt = readReceipt ? `${formatMessageDate(readReceipt.time)} at ${timeFormat(readReceipt.time)}` : '-'
    return (
        <CustomModal open={open} onClose={onClose} sx={{ p: 2, gap: 1 }}>
            <Typography sx={{ fontSize: '1.2rem' }}>
                Message Info
            </Typography>
            <Divider />
            <Stack py={1} gap={2}>
                <ReadReceipt
                    title={'Read'}
                    time={readReceipt?.time}
                    icon={<DoneAllIcon sx={{ fontSize: '1.2rem', color: '#53BDEB' }} />}
                />
                <ReadReceipt
                    title={'Delivered'}
                    time={message.created_at}
                    icon={<DoneOutlinedIcon sx={{ fontSize: '1.2rem', color: 'text.primary' }} />}
                />
            </Stack>
        </CustomModal>
    )
}

function MessageMenuItem({ children, onClick, Icon }) {
    return (
        <MenuItem onClick={onClick} sx={{ gap: 1 }} >
            <Icon />
            {children}
        </MenuItem>
    )
}

export function MessageMenu({ message, visible, color, bgcolor, onClose }) {
    const [openMessageInfoModal, setOpenMessageInfoModal] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { isMe, setReply, deleteMessage } = useMessage(message)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        onClose()
    };

    const copyClickHandler = () => {
        navigator.clipboard.writeText(message.text)
        handleClose()
    }

    const messageInfoClickHandler = () => {
        setOpenMessageInfoModal(true)
    }

    const closeMessageInfoModal = () => {
        setOpenMessageInfoModal(false)
        handleClose()
    }

    const replyClickHandler = () => {
        setReply()
        handleClose()
    }

    const deleteClickHandler = () => {
        deleteMessage()
        handleClose()
    }

    if (openMessageInfoModal) return <MessageInfoModal message={message} open={true} onClose={closeMessageInfoModal} />

    if (!visible) return

    return (
        <Fragment>
            <IconButton
                aria-describedby={'message-menu-button'}
                sx={{
                    bgcolor: 'transparent',
                    height: '2rem',
                    width: '2rem',
                    // color,
                }}
                onClick={replyClickHandler}
            >
                <ReplyIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
            <IconButton
                aria-describedby={'message-menu-button'}
                sx={{
                    bgcolor: 'transparent',
                    height: '2rem',
                    width: '2rem',
                    // color,
                }}
                onClick={handleClick}
            >
                <MoreHorizIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
            <Menu
                id="message-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'message-menu-button',
                }}
            >
                <MessageMenuItem Icon={InfoOutlinedIcon} onClick={messageInfoClickHandler}>Message Info</MessageMenuItem>
                <MessageMenuItem Icon={ContentCopyOutlinedIcon} onClick={copyClickHandler}>Copy</MessageMenuItem>
                {isMe && <MessageMenuItem Icon={DeleteOutlineOutlinedIcon} onClick={deleteClickHandler}>Delete</MessageMenuItem>}
            </Menu>
        </Fragment>
    )
}