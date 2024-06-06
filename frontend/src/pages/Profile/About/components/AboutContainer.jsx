import { Button, Modal, Paper, Stack, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { Fragment, useContext, useState } from 'react'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function AboutContainer({ children, title, ...props }) {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const { user } = useSelector(state => state.user)
    const params = useParams()
    const isMe = !params.profileId || params.profileId === user?._id
    let EditContent;
    if (isMe) {
        const { EditModal } = props
        EditContent = <Fragment>
            <Button startIcon={<EditOutlinedIcon />} onClick={() => setEditModalOpen(true)} variant='outlined'>
                Edit
            </Button>
            <EditModal title={title} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
        </Fragment>
    }
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Stack direction='row' justifyContent={'space-between'}>
                <Typography variant='h3' fontSize={'1.5rem'} fontWeight={600} sx={{ opacity: 0.8 }}>
                    {title}
                </Typography>
                {EditContent}
            </Stack>
            {children}
        </Paper>
    )
}
