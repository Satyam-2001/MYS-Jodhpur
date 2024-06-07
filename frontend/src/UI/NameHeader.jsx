import { IconButton, Stack, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from '../services/axiosinstance';
import { queryClient } from '../services/http';
import { userActions } from '../store/UserSlice';

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default function NameHeader({ profile = {}, sx = {} }) {
    const { _id, basic_info = {} } = profile
    const { name, date_of_birth } = basic_info
    const age = getAge(date_of_birth)

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
