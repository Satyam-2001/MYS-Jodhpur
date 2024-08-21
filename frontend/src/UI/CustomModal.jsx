import { Box, Modal, Stack } from '@mui/material';
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: { xs: '90%', md: 450 },
    maxWidth: '95vw',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    // overflow: 'hidden',
    p: 4,
};

export default function CustomModal({ children, sx = {}, ...props }) {
    return (
        <Modal {...props} >
            <Stack sx={{ ...style, ...sx }}>
                {children}
            </Stack>
        </Modal>
    )
}
