import { IconButton, Stack, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from '../services/axiosinstance';
import { queryClient } from '../services/http';
import { userActions } from '../store/UserSlice';

export default function NameHeader({ profile = {}, sx = {} }) {
    const { _id, basic_info = {} } = profile
    const { name, age } = basic_info


    return (
        <Typography
            variant='body1'
            sx={{
                fontSize: '1.5rem',
                fontWeight: 600,
                ...sx,
                '&:hover': {
                    background: 'var(--text-gradient)',
                    WebkitTextFillColor: 'transparent',
                    WebkitBackgroundClip: 'text'
                }
            }}>
            {`${name}, ${age}`}
        </Typography>
    )
}
