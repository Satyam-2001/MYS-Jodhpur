import React, { useLayoutEffect } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import NoData from '../StatusMessage/NoData';
import UserCardListView, { UserCardListViewSkeleton } from './UserCardListView';
import UserCardGridView, { UserCardGridViewSkeleton } from './UserCardGridView';

export default function ProfilesList({ profilesList, view, isPending }) {

    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    if (!isPending && profilesList.length === 0) {
        return <NoData />
    }

    const viewStyle = shortScreen ? 'grid' : view

    return (
        <Grid
            container
            className='hide-scroll-bar'
            mt={1}
            sx={{
                display: 'flex',
                boxSizing: 'border-box',
                overflow: 'auto',
                justifyContent: 'space-around',
                flex: 1,
                scrollSnapType: 'y mandatory'
            }}
        >
            {!isPending && profilesList.map((data) => {
                return viewStyle === 'grid' ?
                    <UserCardGridView key={data._id} profile={data} /> :
                    <UserCardListView key={data._id} profile={data} />
            })}
            {isPending && (
                viewStyle === 'grid' ?
                    <UserCardGridViewSkeleton />
                    : <UserCardListViewSkeleton />

            )}
        </Grid>
    )
}
