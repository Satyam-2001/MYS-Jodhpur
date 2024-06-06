import { Avatar, Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import sidebarNavigationList from '../../data/sidebarNavigation'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'
import { useSelector } from 'react-redux'
import Block from '../../UI/Block'

function SideNavbarItem({ name, to }) {
    const theme = useTheme()
    const activeBgcolor = chroma(theme.palette.primary.main).alpha(0.3).hex()
    return (
        <NavLink key={name} to={to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => {
                return (
                    <Stack sx={{
                        p: 1,
                        borderRadius: '5px',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: isActive && activeBgcolor,
                        '&:hover': {
                            backgroundColor: !isActive && activeBgcolor
                        }
                    }}>
                        <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'} color={isActive && 'primary.main'}>
                            {name}
                        </Typography>
                    </Stack>
                )
            }}
        </NavLink>
    )
}

export default function SideNavbar() {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <Stack pt={9} pl={1} pb={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Block p={3} gap={2} sx={{ width: '280px', height: '100%', }}>
                <Link to={'/profile'} style={{ textDecoration: 'none' }}>
                    <Stack direction='row' gap={1}>
                        <Avatar src={user?.basic_info.profile_image} sx={{ width: 72, height: 72 }} />
                        <Stack gap={1} sx={{ justifyContent: 'center' }}>
                            <Typography variant='h2' sx={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.85, fontFamily: 'Lexend,sans-serif' }}>
                                {`${user?.basic_info?.name}`}
                            </Typography>
                            <Button onClick={() => navigate('/profile')}>
                                Edit Profile
                            </Button>
                        </Stack>
                    </Stack>
                </Link>
                <Divider />
                <Stack gap={1}>
                    {sidebarNavigationList.map(({ name, to, md = true, auth }) => {
                        if (!md || auth === false) return
                        return <SideNavbarItem key={name} name={name} to={to} />
                    })}
                </Stack>
            </Block>
        </Stack>
    )
}
