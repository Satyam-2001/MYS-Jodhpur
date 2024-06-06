import React, { useLayoutEffect } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import NoData from '../StatusMessage/NoData';
import UserCardListView from './UserCardListView';
import UserCardGridView from './UserCardGridView';

export default function ProfilesList({ profilesList, view }) {

    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    if (!profilesList || !profilesList.length) {
        return <NoData />
    }
    return (
        <Grid container className='hide-scroll-bar' mt={1} sx={{ display: 'flex', boxSizing: 'border-box', overflow: 'auto', justifyContent: 'space-around', flex: 1, scrollSnapType: 'y mandatory' }}>
            {profilesList.map((data) => {
                if (shortScreen || view === 'grid') {
                    return <UserCardGridView key={data._id} profile={data} />
                }
                return <UserCardListView key={data._id} profile={data} />
            })}
        </Grid>
    )
}
