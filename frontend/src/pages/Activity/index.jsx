import React, { useState } from 'react'
import Container from '../../components/Layouts/Container'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import Block from '../../UI/Block';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axiosinstance'
import ActivityCards from './ActivityCards';
import './index.css'

const activityItems = [
    {
        label: 'Shortlisted Profiles',
        Icon: BookmarksOutlinedIcon,
        field: 'shortlisted',
        to: 'shortlist'
    },
    {
        label: 'Matched Profiles',
        Icon: MarkEmailReadOutlinedIcon,
        field: 'matched',
        to: 'matched'
    },
    {
        label: 'Interests Sent',
        Icon: ForwardToInboxOutlinedIcon,
        field: 'sendinterest',
        to: 'interests_sent'
    },
    {
        label: 'Interests Recieved',
        Icon: MoveToInboxOutlinedIcon,
        field: 'recieveinterest',
        to: 'interests_recieved'
    },
]

function ActivityTabCard({ label, Icon, to }) {
    const [isHover, setIsHover] = useState(false)
    return (
        <Link to={`/activity/${to}`} style={{ textDecoration: 'none', flex: 1 }}>
            <Block
                gap={1}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                sx={{
                    height: '150px',
                    minWidth: '150px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}
            >
                <Icon sx={{ fontSize: '3rem', color: isHover ? 'primary.main' : 'text.primary' }} />
                <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', color: isHover ? 'primary.main' : 'text.primary' }}>
                    {label}
                </Typography>
            </Block>
        </Link>
    )
}

export default function Activity() {

    return (
        <Container className='hide-scroll-bar' direction='column' overflow='auto' gap={1} height='100%' >
            <Stack className='hide-scroll-bar' direction='row' gap={1} overflow={'auto'} width='100%' flexShrink={0}>
                {activityItems.map(value => {
                    return <ActivityTabCard key={value.label} {...value} />
                })}
            </Stack>
            {activityItems.map(value => {
                return <ActivityCards key={value.label} {...value} />
            })}
        </Container>
    )
}
