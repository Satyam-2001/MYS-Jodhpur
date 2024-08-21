import React, { Fragment } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { padadhikari } from '../../data/members'
import Tilt from 'react-parallax-tilt'
import { useNavigate } from 'react-router'
import MemberCard from '../Members/MemberCard'

export default function MemberSection() {
    const navigate = useNavigate()

    function navigateMembersHandler() {
        navigate('/members')
    }

    return (
        <Stack gap={3} sx={{ alignItems: 'center' }}>
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center' }} m={0}>
                <span class="text-gradient">Members</span><br />
            </Typography>
            <Grid container rowSpacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {padadhikari.map((data) => {
                    return (
                        <Grid item xs={6} md={2.4} key={data.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MemberCard {...data} />
                        </Grid>
                    )
                })}
            </Grid>
            <Button variant='outlined' size='large' onClick={navigateMembersHandler} sx={{ fontSize: '1.3rem', textTransform: 'capitalize', width: 'fit-content' }}>
                Browse Members
            </Button>
        </Stack>
    )
}