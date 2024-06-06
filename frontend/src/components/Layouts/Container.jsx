import { Stack } from '@mui/material'
import React, { Fragment, useContext } from 'react'
import Sidebar from '../NavigatonBar/SideNavbar'
import { useSelector } from 'react-redux'
import BottomNavigation from '../NavigatonBar/BottomNavbar'
import Header from './Header'

export default function Container({ children, hideSideBar, hideBottomNavBar, hideAppBar, ...props }) {
    const { isLoggedIn } = useSelector(state => state.user)
    let Internal;
    if (!isLoggedIn || hideSideBar) {
        Internal = (
            <Stack p={1} pt={hideAppBar ? 1 : 9} height='100%' flex={1} direction='row' overflow='hidden' {...props}>
                {children}
            </Stack>
        )
    }
    else {
        Internal = (
            <Stack
                direction='row'
                sx={{ height: '100vh' }}
                overflow={'hidden'}
            >
                <Sidebar />
                <Stack p={1} pt={hideAppBar ? 1 : 9} height='100%' flex={1} overflow='hidden' direction='row' {...props} >
                    {children}
                </Stack>
            </Stack >
        )
    }
    return (
        <Stack height='100vh' sx={{ position: 'relative', paddingBottom: { xs: hideBottomNavBar ? 0 : '65px', md: 0 } }} bgcolor={'background.default'} boxSizing='border-box'>
            <Stack boxSizing='border-box' sx={{ flex: 1, overflow: 'hidden', bgcolor: 'background.default' }}>
                {!hideAppBar && <Header />}
                {Internal}
            </Stack>
            {!hideBottomNavBar && <BottomNavigation />}
        </Stack>
    )
}
