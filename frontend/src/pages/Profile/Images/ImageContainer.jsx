import React from 'react'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import { styled } from '@mui/material'

const ImageContainer = styled(ElevatedStack)(({ theme }) => ({
    aspectRatio: '1/1 !important',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        width: 'calc(98%/3)',
        margin: 'calc(2%/6)',
        borderRadius: '0',
    },
    [theme.breakpoints.up('sm')]: {
        width: 'calc(95%/5)',
        margin: 'calc(5%/10)',
    },
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.04)'
    }
}));

export default ImageContainer