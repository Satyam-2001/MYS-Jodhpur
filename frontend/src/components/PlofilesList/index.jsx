import React, { useLayoutEffect } from 'react'
import { Grid, Stack, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import NoData from '../StatusMessage/NoData';
import UserCardListView, { UserCardListViewSkeleton } from './UserCardListView';
import UserCardGridView, { UserCardGridViewSkeleton } from './UserCardGridView';
import EmptyProfileCard from '../StatusMessage/Empty/EmptyProfileCard';

export default function ProfilesList({ profilesList, view, isPending, children }) {

    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    if (!isPending && profilesList.length === 0) {
        return <EmptyProfileCard />
    }

    const viewStyle = shortScreen ? 'grid' : view


    return (
        <Grid
            container
            sx={{
                display: 'flex',
                boxSizing: 'border-box',
                overflow: 'auto',
                justifyContent: 'space-around',
                flex: 1,
                // pt: 1,
                // px: 1,
                scrollSnapType: 'y mandatory',
                scrollBehavior: 'smooth',
            }}
        >
            {!isPending && profilesList.map((data) => {
                if (!data) return
                return viewStyle === 'grid' ?
                    <UserCardGridView key={data?._id} profile={data} /> :
                    <UserCardListView key={data?._id} profile={data} />
            })}
            {isPending && (
                viewStyle === 'grid' ?
                    <UserCardGridViewSkeleton />
                    : <UserCardListViewSkeleton />

            )}
            {children}
        </Grid>
    )
}
