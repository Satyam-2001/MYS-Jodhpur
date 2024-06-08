import React, { Fragment, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { Grid, Pagination, Stack, useTheme } from '@mui/material'

import Filters from './Filters';
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axiosinstance'
import Conatiner from '../Layouts/Container';
import SearchHeader from './SearchHeader';
import ProfilesList from '../PlofilesList';
import { useSelector } from 'react-redux';
import { useSearchParams, } from 'react-router-dom';
// import useDebounce from '../../hooks/useDebounce';
import { useDebounce } from "@uidotdev/usehooks";



export default function SearchPanel({ queryKey, url }) {

    const { isLoggedIn } = useSelector(state => state.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const params = {}
    searchParams.forEach((value, key) => {
        params[key] = value;
    })
    const { filter: filter_open, view, ...filters } = params
    const [page, setPage] = useState(1)
    const debouncedFilters = JSON.parse(useDebounce(JSON.stringify(filters), 500))

    const { data, isPending } = useQuery({
        queryKey: [...queryKey, debouncedFilters],
        queryFn: ({ signal, queryKey }) => axios.get(url, { params: queryKey[queryKey.length - 1], signal }),
        // placeholderData: (data) => data,
        staleTime: 30000
    })

    const { users: profilesList = [], currentPage = 1, totalPages = 1, totalUsers = 10 } = data || {}

    const handlePageChange = (event, value) => {
        setPage(value)
        setSearchParams((searchParams) => {
            searchParams.set('page', value)
            return searchParams
        })
    }

    return (
        <Stack direction={isLoggedIn && 'row-reverse'} gap={filter_open ? 1 : 0} height='100%' width='100%'>
            <Filters />
            <Stack alignItems={'center'} sx={{ width: { xs: '100%', md: filter_open ? '75%' : '100%' }, height: '100%', transition: 'width 0.35s', flex: 1 }}>
                <SearchHeader />
                <ProfilesList isPending={isPending} profilesList={profilesList || []} view={view} >
                    {totalPages > 1 && <Grid item xs={12} sx={{ scrollSnapAlign: 'start', justifyContent: 'center', p: 2, display: 'flex' }}>
                        <Pagination page={page} count={totalPages} onChange={handlePageChange} />
                    </Grid>}
                </ProfilesList>
            </Stack>
        </Stack>
    )
}
