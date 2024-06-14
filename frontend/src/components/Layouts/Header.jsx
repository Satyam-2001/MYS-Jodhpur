import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Stack, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import logo from '../../assets/logo.png';
import Navbar, { NavDrawer } from '../NavigatonBar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import chroma from "chroma-js";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ColorModeContext } from '../../theme';
import { useSelector } from 'react-redux';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Fragment } from 'react';

const drawerWidth = 280;

export default function Header() {
    const theme = useTheme();
    const navigate = useNavigate()

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { isLoggedIn, user } = useSelector(state => state.user)
    const image = user?.basic_info?.profile_image
    const { mode, toggleMode } = React.useContext(ColorModeContext);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window.document.body : undefined;

    const drawer = (
        <Stack onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Stack justifyContent='space-between' alignItems='center' >
                <Stack gap={2} p={2} alignItems='center' maxWidth='auto' >
                    <img src={logo} style={{ width: '50%' }} />
                    <Typography variant='h3' fontFamily={"'Nosifer', sans-serif"}>
                        <span className="text-gradient">MYS Jodhpur</span>
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
            <NavDrawer />
        </Stack>
    );

    return (
        <Box sx={{ flexGrow: 0 }}>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block' },
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <AppBar position="fixed" elevation={0} sx={{ backgroundColor: chroma(theme.palette.background.paper).alpha(1).hex(), boxSizing: 'border-box', width: '100%', backdropFilter: 'blur(4px)' }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' height='4rem' px={2} >
                    <Box onClick={handleDrawerToggle} justifyContent='space-between' alignItems='center' gap={2} sx={{ height: '3.2rem' }}>
                        <img src={logo} style={{ height: '95%' }} />
                    </Box>
                    <Navbar />
                    <Stack direction='row' gap='2px' alignItems='center'>
                        <IconButton
                            onClick={toggleMode}
                            sx={{ p: { xs: '8px' } }}
                        >
                            {mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }} /> : <DarkModeOutlinedIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }} />}
                        </IconButton>
                        {isLoggedIn ?
                            <Fragment>
                                <IconButton
                                    sx={{ mx: { xs: 0, md: 2 }, p: { xs: '8px' } }}
                                    onClick={toggleMode}
                                >
                                    <NotificationsNoneOutlinedIcon sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }} />
                                </IconButton>
                                <Link to={`/profile`} style={{ paddingLeft: '4px' }}>
                                    <Avatar alt={user?.basic_info?.name} src={image} />
                                </Link>
                            </Fragment>
                            :
                            <Button variant='text' sx={{ p: 1, ml: 1 }} onClick={() => { navigate('/register') }}>
                                Register
                            </Button>
                        }
                    </Stack>
                </Stack>
                {/* <Divider /> */}
            </AppBar>
        </Box>
    );
}