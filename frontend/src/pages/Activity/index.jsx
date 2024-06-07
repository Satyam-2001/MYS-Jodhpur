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

const activityTabs = [
    {
        label: 'Shortlisted Profiles',
        Icon: BookmarksOutlinedIcon,
        to: '/activity/shortlist'
    },
    {
        label: 'Matched Profiles',
        Icon: MarkEmailReadOutlinedIcon,
        to: '/activity/matched'
    },
    {
        label: 'Intrests Sent',
        Icon: ForwardToInboxOutlinedIcon,
        to: '/activity/intrests_sent'
    },
    {
        label: 'Intrests Recieved',
        Icon: MoveToInboxOutlinedIcon,
        to: '/activity/intrests_recieved'
    },
]

function ActivityTabCard({ label, Icon, to }) {
    const [isHover, setIsHover] = useState(false)
    return (
        <Link to={to} style={{ textDecoration: 'none', flex: 1 }}>
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
    const { data, isPending } = useQuery({
        queryKey: ['users', 'activity'],
        queryFn: () => axios.get('/activity')
    })

    console.log(data)

    return (
        <Container className='hide-scroll-bar' direction='column' overflow='auto' gap={1} height='100%' >
            <Stack className='hide-scroll-bar' direction='row' gap={1} overflow={'auto'} width='100%' flexShrink={0}>
                {activityTabs.map(tabValue => {
                    return <ActivityTabCard key={tabValue.label} {...tabValue} />
                })}
            </Stack>
            <Block height='max-content'>
                <ActivityCards
                    data={data}
                    isPending={isPending}
                    field={'shortlisted'}
                    title={'Shortlisted Profiles'}
                    url={'shortlisted'}
                />
                <ActivityCards
                    data={data}
                    isPending={isPending}
                    field={'matchintrest'}
                    title={'Matched Profiles'}
                    url={'matchintrest'}
                />
                <ActivityCards
                    data={data}
                    isPending={isPending}
                    field={'sendintrest'}
                    title={'Intrests Sent'}
                    url={'sendintrest'}
                />
                <ActivityCards
                    data={data}
                    isPending={isPending}
                    field={'recieveintrest'}
                    title={'Intrests Recieved'}
                    url={'recieveintrest'}
                />
            </Block>
        </Container>
    )
}
