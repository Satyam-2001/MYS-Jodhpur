import React, { useState } from 'react'
import Container from '../../components/Layouts/Container'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import { ElevatedStack } from '../../UI/ElevatedComponents';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axiosinstance'
import ActivityCards from './ActivityCards';
import './index.css'
import { usePrivateRoute } from '../../hooks/useProtectedRoute';
import DeclinedSection from './DeclinedSection';

const activityItems = [
    {
        label: 'Matched Profiles',
        Icon: MarkEmailReadOutlinedIcon,
        field: 'matchinterest',
        to: 'matched'
    },
    {
        label: 'Interests Sent',
        Icon: ForwardToInboxOutlinedIcon,
        field: 'sendinterest',
        to: 'interests_sent'
    },
    {
        label: 'Interests Received',
        Icon: MoveToInboxOutlinedIcon,
        field: 'receiveinterest',
        to: 'interests_received'
    },
    {
        label: 'Shortlisted Profiles',
        Icon: BookmarksOutlinedIcon,
        field: 'shortlisted',
        to: 'shortlist'
    },
]

function ActivityTabCard({ label, Icon, to }) {
    return (
        <Link to={`/activity/${to}`} style={{ textDecoration: 'none', flex: 1 }}>
            <ElevatedStack
                gap={1}
                sx={{
                    height: '150px',
                    minWidth: '150px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    '&:hover': {
                        bgcolor: 'action.hover'
                    }
                }}
            >
                <Icon sx={{ fontSize: '3rem', color: 'text.primary' }} />
                <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', color: 'text.primary' }}>
                    {label}
                </Typography>
            </ElevatedStack>
        </Link>
    )
}

export default function Activity() {

    usePrivateRoute()

    const header = {
        title: 'Activity',
    }


    return (
        <Container header={header} direction='column' overflow='auto' gap={1} >
            <Stack px={1} pb={1} pt={'2px'} direction='row' gap={1} overflow={'auto'} width='100%' flexShrink={0}>
                {activityItems.map(value => {
                    return <ActivityTabCard key={value.label} {...value} />
                })}
            </Stack>
            {activityItems.map(value => {
                return <ActivityCards key={value.label} {...value} />
            })}
            <DeclinedSection />
        </Container>
    )
}
