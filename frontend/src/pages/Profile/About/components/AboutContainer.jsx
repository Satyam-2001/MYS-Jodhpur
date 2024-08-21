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
            <Button variant='text' sx={{fontFamily: 'Lexend,sans-serif', textTransform: 'capitalize', fontSize: '0.9rem'}} startIcon={<EditOutlinedIcon />} onClick={() => setEditModalOpen(true)}>
                Edit
            </Button>
            <EditModal title={title} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
        </Fragment>
    }
    return (
        <Stack sx={{ py: 1 }}>
            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                <Typography variant='h3' fontSize={'1.2rem'} sx={{ opacity: 0.8, fontFamily: 'Lexend,sans-serif', fontWeight: 600, textAlign: 'center' }}>
                    {title}
                </Typography>
                {EditContent}
            </Stack>
            {children}
        </Stack>
    )
}
