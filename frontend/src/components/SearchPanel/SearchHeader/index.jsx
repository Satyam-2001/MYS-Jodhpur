import React, { Fragment, useContext, useLayoutEffect } from 'react'
import { Box, Fade, IconButton, Stack, useTheme, } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchBar from './SearchBar';
import SortMenu from './SortMenu'
import { ElevatedIconButton, ElevatedStack } from '../../../UI/ElevatedComponents';
import { useSearchParams } from 'react-router-dom';

function ViewButton({ children, view, sx }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const view_style = searchParams.get('view') || 'list'

    const active = view === view_style
    const changeViewStyleHandler = () => {
        setSearchParams((searchParams) => {
            searchParams.set('view', view)
            return searchParams
        })
    }

    return (
        <ElevatedIconButton
            onClick={changeViewStyleHandler}
            elevation={active ? -1 : 1}
            sx={{ bgcolor: active && 'primary.main', color: (active ? 'white' : undefined), '&:hover': {bgcolor: active && 'primary.dark'}, ...sx }}>
            {children}
        </ElevatedIconButton>
    )
}

export default function SearchHeader({ toggleFilterHandler }) {

    return (
        <ElevatedStack direction='row' gap={1} p={{ xs: 0.5, md: 1 }} sx={{ width: '100%', alignItems: 'center' }}>
            <IconButton onClick={toggleFilterHandler}>
                <FilterAltIcon fontSize='large' />
            </IconButton>
            <SearchBar />
            <Stack direction='row' gap={1}>
                <SortMenu />
                <Stack direction='row' gap={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <ViewButton view='list' >
                        <FormatListBulletedIcon fontSize='large' />
                    </ViewButton>
                    <ViewButton view='grid' >
                        <GridViewIcon fontSize='large' />
                    </ViewButton>
                </Stack>
            </Stack>
        </ ElevatedStack>
    )
}
