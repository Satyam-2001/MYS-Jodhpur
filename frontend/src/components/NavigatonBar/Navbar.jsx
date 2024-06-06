import React, { useState } from 'react'
import { Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom';

import navigationList from '../../data/navigation';

function IconElement({ to, name, icon }) {


    const tipTitle = (
        <Typography variant='h5' sx={{ color: 'white' }}>
            {name}
        </Typography>
    )

    return (
        <Tooltip title={tipTitle}  >
            <NavLink to={to} >
                {({ isActive }) => (
                    <IconButton
                        size="medium"
                        edge="start"
                        sx={{
                            borderRadius: '20px',
                            background: isActive ? 'linear-gradient(135deg, #C52062 2.34%, #FE880C 100.78%)' : 'transparent',
                            color: isActive ? 'white' : undefined,
                        }}
                    >
                        {icon}
                    </IconButton>)}
            </NavLink>
        </Tooltip>)
}

function ButtonElement({ to, name, icon }) {
    const theme = useTheme()
    return (
        <NavLink to={to} >
            {({ isActive }) => (
                <Button
                    startIcon={icon}
                    sx={{
                        width: '75%',
                        borderRadius: '10px',
                        background: isActive ? 'linear-gradient(135deg, #cc0000 2.34%, #e96214d6 100.78%)' : 'transparent',
                        color: theme.palette.text.primary,
                    }}
                >
                    <Typography variant='h5'>
                        {name}
                    </Typography>
                </Button>)}
        </NavLink>)
}

function Navbar() {

    return (
        <Stack
            direction='row'
            gap={5}
            sx={{
                display: { xs: 'none', sm: 'flex' },
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%,0%)'
            }}
        >
            {navigationList.map(({ name, to, icon }) => <IconElement key={name} to={to} name={name} icon={icon} />)}
        </Stack>
    )
}

export function NavDrawer() {
    return (
        <Stack p={2} gap={1}>
            {navigationList.map(({ name, to, icon }) => <ButtonElement key={name} to={to} name={name} icon={icon} />)}
        </Stack>
    )
}
export default Navbar