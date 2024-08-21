import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Avatar, Button, IconButton, Stack, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import chroma from "chroma-js";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ColorModeContext } from '../../theme';
import { useSelector } from 'react-redux';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ElevatedIconButton, ElevatedStack } from '../../UI/ElevatedComponents';
import { Heading, elevation } from '../../theme/styles';
import NavDrawer from './NavDrawer';
import Navbar from '../NavigatonBar/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const APPBAR_HEIGHT = 58

const AuthButton = styled(Button)(({ theme }) => ({
    fontFamily: 'Lexend,sans-serif',
    fontSize: '0.85rem',
    boxShadow: elevation(),
    textTransform: 'none',
    borderRadius: '1rem',
}))

export function HeaderContainer({ children, translucent }) {
    const theme = useTheme()
    return (
        <AppBar
            elevation={0}
            sx={{
                position: 'fixed',
                backgroundColor: translucent ? 'rgba(0, 0, 0, 0.1)' : 'background.paper',
                boxSizing: 'border-box',
                width: '100%',
                backdropFilter: 'blur(4px)',
                boxShadow: elevation(),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                gap: 2,
                height: `${APPBAR_HEIGHT}px`,
                flexDirection: 'row',
            }}
        >
            {children}
        </AppBar>
    )
}

export function HeaderStart({ children, header, sx = {} }) {

    const navigate = useNavigate()

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <Stack direction='row' sx={{ gap: 1, alignItems: 'center', ...sx }}>
            {header?.goBack && <IconButton onClick={goBackHandler}><ArrowBackIcon sx={{ color: { md: 'text.primary' }, fontSize: { md: '1.6rem' } }} /></IconButton>}
            {header.title && <Heading>{header.title}</Heading>}
            {children}
        </Stack>
    )
}

export default function Header({ appBarTranslucent, header }) {
    const navigate = useNavigate()

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { isLoggedIn, user } = useSelector(state => state.user)
    const image = user?.basic_info?.profile_image
    const { mode, toggleMode } = React.useContext(ColorModeContext);
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isCustomHeader = isMobile && header


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const notificationClickHandler = () => {
        navigate('/notifications')
    }

    if (isCustomHeader) {
        return (
            <>
                <NavDrawer open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <HeaderContainer translucent={appBarTranslucent}>
                    <HeaderStart header={header} />
                    <Stack direction='row' gap={2.5}>
                        {isLoggedIn &&
                            <ElevatedIconButton onClick={handleDrawerToggle} sx={{ width: 40, height: 40 }}>
                                <Avatar alt={user?.basic_info?.name} src={image} />
                            </ElevatedIconButton>
                        }
                    </Stack>
                </HeaderContainer>
            </>
        )
    }

    const icon_style = {
        color: appBarTranslucent ? 'white' : 'text.primary',
        opacity: 0.8,
        fontSize: { xs: '1.2rem', md: '1.4rem' },
    }

    return (
        <>
            <NavDrawer open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <HeaderContainer translucent={appBarTranslucent}>
                <Link to={isLoggedIn ? '/search' : '/'} style={{ textDecoration: 'none' }}>
                    <Stack direction='row' justifyContent='center' alignItems='center' gap={2} sx={{ height: '3.2rem' }}>
                        <img src={logo} style={{ height: '85%' }} />
                        {/* {!isLoggedIn && <Typography variant='h1' sx={{ cursor: 'pointer', fontFaimily: '"Baloo Bhaijaan 2", sans-serif', transition: 'scale 0.2s', fontSize: { xs: '0.8rem', md: '1.4rem' }, color: 'white', textAlign: 'center', '&:hover': { scale: '1.1' } }} m={0}>
                            <span class="text-gradient">mys-shaadi.com</span><br />
                        </Typography>} */}
                    </Stack>
                </Link>
                {!isLoggedIn && <Navbar />}
                <Stack direction='row' gap={{ xs: 1.5, md: 2 }} alignItems='center'>
                    <ElevatedIconButton
                        sx={{ bgcolor: 'transparent', borderRadius: { xs: '14px', md: '16px' } }}
                        onClick={toggleMode}
                    >
                        {mode === 'dark' ? <LightModeOutlinedIcon sx={icon_style} /> : <DarkModeOutlinedIcon sx={icon_style} />}
                    </ElevatedIconButton>
                    {isLoggedIn && <ElevatedIconButton
                        sx={{ bgcolor: 'transparent', borderRadius: { xs: '14px', md: '16px' } }}
                        onClick={notificationClickHandler}
                    >
                        <NotificationsNoneOutlinedIcon sx={icon_style} />
                    </ElevatedIconButton>}
                    {isLoggedIn &&
                        <ElevatedIconButton onClick={handleDrawerToggle} sx={{ width: 40, height: 40 }}>
                            <Avatar alt={user?.basic_info?.name} src={image} />
                        </ElevatedIconButton>}
                    {!isLoggedIn && <>
                        <AuthButton variant='text' onClick={() => { navigate('/login') }}>
                            Login
                        </AuthButton>
                        <AuthButton variant='contained' sx={{ color: 'white' }} onClick={() => { navigate('/register') }}>
                            Register
                        </AuthButton>
                    </>}
                </Stack>
                {/* <Divider /> */}
            </HeaderContainer>
        </>
    );
}