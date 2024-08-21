import { Avatar, Badge, Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import React, { useContext, useLayoutEffect, useState } from 'react'
import sidebarNavigationList from '../../data/sidebarNavigation'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'
import { useSelector } from 'react-redux'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { ElevatedIconButton } from '../../UI/ElevatedComponents';
import { APPBAR_HEIGHT } from '../Layouts/Header'

export function SideNavbarHeader({ open = true, sx = {} }) {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <Link to={'/profile'} style={{ textDecoration: 'none' }}>
            <Stack direction='row' gap={2} sx={{ alignItems: 'center', justifyContent: open ? 'flex-start' : 'space-evenly', ...sx }}>
                <ElevatedStack sx={{ borderRadius: '50%' }}>
                    <Avatar src={user?.basic_info?.profile_image} sx={{ width: open ? 64 : 48, height: open ? 64 : 48 }} />
                </ElevatedStack>
                {open && <Stack gap={0.5} sx={{ justifyContent: 'center' }}>
                    <Typography variant='h2' sx={{ fontSize: '1.2rem', fontWeight: 500, opacity: 0.85, fontFamily: 'Lexend,sans-serif', textAlign: 'center' }}>
                        {`${user?.basic_info?.name}`}
                    </Typography>
                    <Button onClick={() => navigate('/profile')}>
                        Edit Profile
                    </Button>
                </Stack>}
            </Stack>
        </Link>
    )
}

function SideNavbarItem({ name, to, isOpen, Icon, badge }) {
    const theme = useTheme()
    const activeBgcolor = chroma(theme.palette.primary.main).alpha(0.3).hex()


    return (
        <NavLink key={name} to={to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => {
                const textElement = <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'} color={isActive && 'primary.main'}>
                    {name}
                </Typography>
                const iconElement = <Icon sx={{ color: isActive ? 'primary.main' : 'text.primary' }} />
                let children = isOpen ? textElement : iconElement
                // if (badge) {
                //     children = isOpen ? <Stack direction='row'>{[textElement, <Badge badgeContent={2} variant='standard' color="primary" />]}</Stack > : <Badge variant='dot' color="primary">{iconElement}</Badge>
                // }
                return (
                    <ElevatedStack
                        elevation={isActive ? -1 : 1}
                        sx={{
                            p: 1,
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: isActive && activeBgcolor,
                            '&:hover': {
                                backgroundColor: !isActive && activeBgcolor
                            }
                        }}>
                        {children}
                    </ElevatedStack>
                )
            }}
        </NavLink>
    )
}

export default function SideNavbar() {

    const defaultOpen = localStorage.getItem('sidebar') === 'true'
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useLayoutEffect(() => {
        setIsOpen(localStorage.getItem('sidebar') === 'true')
    }, [])

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        localStorage.setItem('sidebar', !isOpen)
    };

    return (
        <Stack pt={`${APPBAR_HEIGHT + 8}px`} pl={1} pb={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ElevatedStack p={isOpen ? 3 : 1} gap={2} sx={{ width: isOpen ? '280px' : '80px', height: '100%', transition: 'ease width 0.3s' }}>
                <SideNavbarHeader open={isOpen} />
                <Divider />
                <Stack justifyContent={'space-between'} sx={{ flex: 1 }}>
                    <Stack gap={1.4}>
                        {sidebarNavigationList.map(({ md = true, auth, ...props }) => {
                            if (!md || auth === false) return
                            return <SideNavbarItem key={props.name} {...props} isOpen={isOpen} />
                        })}
                    </Stack>
                    <Stack alignItems={'flex-end'}>
                        <ElevatedIconButton size='large' onClick={toggleSidebar} sx={{ borderRadius: '10px', width: '100%', height: '50px', transition: 'ease transform 0.3s', transform: !isOpen && 'rotate(180deg)' }}>
                            <MenuOpenIcon sx={{ fontSize: '1.6rem' }} />
                        </ElevatedIconButton>
                    </Stack>
                </Stack>
            </ElevatedStack>
        </Stack>
    )
}
