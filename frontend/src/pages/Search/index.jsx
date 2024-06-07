import React, { Fragment, useContext, useLayoutEffect, useMemo } from 'react'
import { Stack, useTheme } from '@mui/material'

import Filters from './Filters';
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axiosinstance'
import Conatiner from '../../components/Layouts/Container';
import SearchHeader from './SearchHeader';
import ProfilesList from '../../components/PlofilesList';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
// import useDebounce from '../../hooks/useDebounce';
import { useDebounce } from "@uidotdev/usehooks";

export default function Search() {

    const theme = useTheme()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoggedIn } = useSelector(state => state.user)
    const { search, filter_open, view_style } = useSelector(state => state.search)
    const gender = searchParams.get('gender')
    const min_age = searchParams.get('min_age') || 18
    const max_age = searchParams.get('max_age') || 50
    const min_height = searchParams.get('min_height') || 48
    const max_height = searchParams.get('max_height') || 76
    const min_income = searchParams.get('min_income') || 0
    const max_income = searchParams.get('max_income') || 100
    const sortby = searchParams.get('sortby')
    const filters = { search, gender, min_age, max_age, min_height, max_height, min_income, max_income, sortby }
    const debouncedFilters = JSON.parse(useDebounce(JSON.stringify(filters), 500))


    const { data: userData, isLoading, isPending, isFetching } = useQuery({
        queryKey: ['users', debouncedFilters],
        queryFn: ({ signal, queryKey }) => axios.get('/user', { params: queryKey[1], signal }),
        placeholderData: (data) => data,
        staleTime: 30000
    })

    return (
        <Conatiner direction={isLoggedIn && 'row-reverse'} gap={filter_open ? 1 : 0}>
            <Filters />
            <Stack sx={{ width: { xs: '100%', md: filter_open ? '75%' : '100%' }, height: '100%', transition: 'width 0.35s', flex: 1 }}>
                <SearchHeader />
                <ProfilesList isPending={isLoading} profilesList={userData || []} view={view_style} />
            </Stack>
        </Conatiner>
    )
}
