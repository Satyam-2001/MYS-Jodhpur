import { Stack } from '@mui/material'
import React, { Fragment, forwardRef, useContext } from 'react'
import Sidebar from '../NavigatonBar/SideNavbar'
import { useSelector } from 'react-redux'
import BottomNavigation, { BOTTOMBAR_HEIGHT } from '../NavigatonBar/BottomNavbar'
import Header, { APPBAR_HEIGHT } from './Header'
import Footer from './Footer'
import { useScroll, useTransform } from 'framer-motion'

const Container = forwardRef(({ children, hideSideBar, hideBottomNavBar, hideAppBar, appBarTranslucent, showFooter, header, style = {}, ...props }, ref) => {
    const { isLoggedIn } = useSelector(state => state.user)

    let Internal;
    if (!isLoggedIn || hideSideBar) {
        Internal = (
            <Stack
                ref={ref}
                p={1}
                pt={hideAppBar ? 1 : `${APPBAR_HEIGHT + 8}px`}
                height='100%'
                flex={1}
                direction='row'
                overflow='hidden'
                {...props}
            >
                {children}
                {showFooter && <Footer />}
            </Stack>
        )
    }
    else {
        Internal = (
            <Stack
                direction='row'
                sx={{ height: '100vh' }}
                overflow={'hidden'}
                gap={{ md: 1 }}
                p={{ md: 1 }}
            >
                <Sidebar />
                <Stack ref={ref} p={1} pt={hideAppBar ? 1 : `${APPBAR_HEIGHT + 8}px`} flex={1} overflow='hidden' direction='row' {...props} >
                    {children}
                    {showFooter && <Footer />}
                </Stack>
            </Stack >
        )
    }
    return (
        <Stack height='100vh' boxSizing={'border-box'} sx={{ position: 'relative', paddingBottom: { xs: hideBottomNavBar ? 0 : BOTTOMBAR_HEIGHT, md: 0 }, bgcolor: 'background.default', ...style }}>
            <Stack boxSizing={'border-box'} sx={{ flex: 1, overflow: 'hidden', bgcolor: 'inherit' }}>
                {!hideAppBar && <Header header={header} appBarTranslucent={appBarTranslucent} />}
                {Internal}
            </Stack>
            {!hideBottomNavBar && <BottomNavigation />}
        </Stack>
    )
})

export default Container;
