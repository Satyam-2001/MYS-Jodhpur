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
import { useFormik } from 'formik';
import { preferenceSchema } from '../../schemas/preferenceSchema';
import { initialFilterValues } from './utils';

const initialValues = {
    manglik: '',
    martial_status: '',
    diet: '',
    complexion: '',
    weight_category: '',
    mother_tongue: '',
    family_status: '',
    family_type: '',
    family_values: '',
    drinks: '',
    smoke: '',
    education: '',
    occupation: '',
    employed_in: '',
}

export default function SearchPanel({ queryKey, url }) {

    const { isLoggedIn } = useSelector(state => state.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState({})
    const params = {}
    searchParams.forEach((value, key) => {
        params[key] = value;
    })

    const formik = useFormik({
        initialValues: initialFilterValues,
        validationSchema: preferenceSchema,
        onSubmit: (values, action) => {
            // setFilters(values)
            setFilterOpen(false)
            setSearchParams(prevParams => {
                // Create a new URLSearchParams instance to work with
                const updatedParams = new URLSearchParams();

                // Iterate over values and update searchParams
                Object.keys(values).forEach(key => {
                    if (values[key]) {
                        updatedParams.set(key, values[key]);
                    }
                });

                // Return the updated parameters
                return updatedParams;
            });
        }
    })

    const { view, search, ...filter } = params
    const page = +searchParams.get('page') || 1
    const [filterOpen, setFilterOpen] = useState(false)
    const searchValue = useDebounce(search, 500)

    const toggleFilterHandler = () => {
        setFilterOpen(prop => !prop)
    }

    const applyFiltersHandler = (values) => {
        setFilters(values)
        setFilterOpen(false)
    }

    const { data, isPending } = useQuery({
        queryKey: [...queryKey, { ...filter, search: searchValue }],
        queryFn: ({ signal, queryKey }) => axios.get(url, { params: queryKey[queryKey.length - 1], signal }),
        // placeholderData: (data) => data,
    })

    const { users: profilesList = [], currentPage = 1, totalPages = 1, total = 10 } = data || {}
    // const total_messages = data?.total || 0
    // const hasMore = totalPages > currentPage
    // const [sentryRef, { scrollRef }] = useInfiniteScroll({
    //     loading: isPending,
    //     hasNextPage: hasMore,
    //     onLoadMore: loadMoreMessages,
    // });


    const handlePageChange = (event, value) => {
        setSearchParams((searchParams) => {
            searchParams.set('page', value)
            return searchParams
        })
    }

    return (
        <Stack direction={isLoggedIn && 'row-reverse'} height='100%' width='100%'>
            <Filters open={filterOpen} formik={formik} toggleFilterHandler={toggleFilterHandler} applyFiltersHandler={applyFiltersHandler} />
            <Stack alignItems={'center'} gap={1.5} sx={{ width: '100%', height: '100%', flex: 1 }}>
                <SearchHeader toggleFilterHandler={toggleFilterHandler} />
                <ProfilesList isPending={isPending} profilesList={profilesList || []} view={view} >
                    {totalPages > 1 && <Grid item xs={12} sx={{ scrollSnapAlign: 'start', justifyContent: 'center', p: 2, display: 'flex' }}>
                        <Pagination page={page} count={totalPages} onChange={handlePageChange} />
                    </Grid>}
                </ProfilesList>
            </Stack>
        </Stack>
    )
}
