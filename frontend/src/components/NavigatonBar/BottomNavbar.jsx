import { Stack, Typography } from '@mui/material'
import React from 'react'
import sidebarNavigationList from '../../data/sidebarNavigation'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BottomNavigation() {
    const { isLoggedIn } = useSelector(state => state.user)
    return (
        <Stack position={'fixed'} direction='row' sx={{ display: { md: 'none' }, width: '100%', height: '64px', bgcolor: 'background.paper', justifyContent: 'space-evenly', alignItems: 'center', bottom: 0 }}>
            {sidebarNavigationList.map(({ Icon, name, to, auth }) => {
                if (auth !== undefined && (auth ^ isLoggedIn)) return
                return (
                    <NavLink key={name} style={{ textDecoration: 'none' }} to={to}>{
                        ({ isActive }) => (
                            <Stack sx={{ alignItems: 'center' }}>
                                <Icon sx={{ fontSize: '1.6rem', color: isActive ? 'primary.main' : 'text.primary' }} />
                                <Typography sx={{ color: isActive ? 'primary.main' : 'text.primary' }}>{name}</Typography>
                            </Stack>)
                    }
                    </NavLink>
                )
            })}
        </Stack>
    )
}
