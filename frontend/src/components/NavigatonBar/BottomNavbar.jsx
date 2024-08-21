import { Stack, Typography } from '@mui/material'
import React from 'react'
import sidebarNavigationList from '../../data/sidebarNavigation'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ElevatedStack } from '../../UI/ElevatedComponents'

export default function BottomNavigation() {
    const { isLoggedIn } = useSelector(state => state.user)
    return (
        <ElevatedStack position={'fixed'} gap={1} px={1} direction='row' sx={{ display: { md: 'none' }, width: '100%', height: '64px', bgcolor: 'background.paper', justifyContent: 'space-evenly', alignItems: 'center', bottom: 0, borderRadius: 0 }}>
            {sidebarNavigationList.map(({ Icon, name, to, auth }) => {
                if (auth !== undefined && (auth ^ isLoggedIn)) return
                return (
                    <NavLink key={name} style={{ textDecoration: 'none', flex: 1 }} to={to}>{
                        ({ isActive }) => (
                            <ElevatedStack elevation={isActive ? -1.5 : 1} p={'3px'} sx={{ height: '48px', justifyContent: 'center', alignItems: 'center', borderRadius: '18px', bgcolor: isActive ? 'primary.main' : null }}>
                                <Icon sx={{ fontSize: '1.6rem', color: isActive ? 'white' : 'text.primary' }} />
                                <Typography sx={{ color: isActive ? 'white' : 'text.primary', fontSize: '0.58rem' }}>{name}</Typography>
                            </ElevatedStack>)
                    }
                    </NavLink>
                )
            })}
        </ElevatedStack>
    )
}
