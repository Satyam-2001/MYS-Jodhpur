import React, { Fragment } from 'react'
import Container from '../../components/Layouts/Container'
import MemberCard from '../../components/MemberCard'
import { Grid, Typography } from '@mui/material'
import { karyakaarni, members, padadhikari } from '../../data/members'

function MembersGrid({ title, members, hideDesignaton }) {
    return (
        <Fragment>
            <Typography variant='h1' fontWeight={600} sx={{ fontSize: '4.5rem', textAlign: 'center' }}>
                <span class="text-gradient" style={{ paddingTop: '14px' }}>{title}</span><br />
            </Typography>
            <Grid container rowSpacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {members.map((data) => {
                    return (
                        <Grid item xs={6} md={2.4} key={data.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MemberCard {...data} hideDesignaton={hideDesignaton} />
                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    )
}

export default function Members() {
    return (
        <Container hideSideBar direction='column' gap={4} pt={12} overflow={'auto'}>
            <MembersGrid title={'पदाधिकारी'} members={padadhikari} />
            <MembersGrid title={'कार्यकारणी सदस्य'} hideDesignaton members={karyakaarni} />
            <MembersGrid title={'सदस्य'} hideDesignaton members={members} />
        </Container>
    )
}
