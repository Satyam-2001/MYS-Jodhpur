import React, { Fragment, useContext, useLayoutEffect } from 'react'
import { Box, Fade, IconButton, Stack, useTheme, } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchBar from './SearchBar';
import SortMenu from './SortMenu'
import Block from '../../../UI/Block';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../../../store/SearchSlice';

function ViewButton({ children, view, sx }) {
    const { view_style } = useSelector(state => state.search)
    const dispatch = useDispatch()
    const active = view === view_style
    const changeViewStyleHandler = () => {
        dispatch(searchActions.setViewStyle(view))
    }
    return (
        <IconButton 
        onClick={changeViewStyleHandler} 
        sx={{ backgroundImage: (active ? 'var(--text-gradient)' : 'none'), color: (active ? 'white' : undefined), ...sx }}>
            {children}
        </IconButton>
    )
}

export default function SearchHeader() {

    const { filter_open } = useSelector(state => state.search)
    const dispatch = useDispatch()

    const toggleFilterHandler = () => {
        dispatch(searchActions.toggleFilter())
    }

    return (
        <Block direction='row' gap={1} p={1} sx={{ width: '100%', alignItems: 'center' }}>
            <IconButton onClick={toggleFilterHandler}>
                {filter_open ? <FilterAltOffIcon fontSize='large' /> : <FilterAltIcon fontSize='large' />}
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
        </ Block>
    )
}
