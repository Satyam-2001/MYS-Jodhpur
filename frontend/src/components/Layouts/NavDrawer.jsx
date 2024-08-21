import { Stack, Typography, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { SideNavbarHeader } from '../NavigatonBar/SideNavbar';
import { Link, NavLink } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import chroma from 'chroma-js';

const navDrawerItems = [
    { name: 'Home', to: '/search' },
    { name: 'Members', to: '/members' },
    { name: 'About Us', to: '/aboutus' },
    { name: 'Terms of use', to: '/termsofuse' },
    { name: 'Declined Interests', to: '/activity/declined' },
]

function NavDrawerItems({ name, to }) {
    const theme = useTheme()
    const activeBgcolor = chroma(theme.palette.primary.main).alpha(0.3).hex()
    const hoverActiveBgcolor = chroma(theme.palette.primary.main).alpha(0.5).hex()

    return (
        <NavLink to={to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
                <Stack
                    direction='row'
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: isActive ? activeBgcolor : 'transparent',
                        px: 2,
                        py: 1.5,
                        '&:hover': { bgcolor: isActive ? hoverActiveBgcolor : 'action.focus' }
                    }}
                >
                    <Typography sx={{ fontFamily: 'Lexend,sans-serif', fontSize: '16px' }}>{name}</Typography>
                    <ArrowForwardIosIcon sx={{ color: 'text.primary' }} />
                </Stack>
            )}

        </NavLink>
    )
}

export default function NavDrawer({ open, handleDrawerToggle }) {

    const container = window !== undefined ? () => window.document.body : undefined;
    const theme = useTheme()

    return (
        <Drawer
            anchor='right'
            container={container}
            variant="temporary"
            open={open}
            elevation={0}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { width: '320px', maxWidth: '80%', bgcolor: 'background.default', borderRadius: '30px 0px 0px 30px' },
            }}
        >
            <Stack sx={{ flex: 1, }}>
                <Stack sx={{ textAlign: 'center', py: 2, px: { xs: 2, md: 2 } }}>
                    <SideNavbarHeader sx={{ borderBottom: 1, borderColor: 'divider', py: 2 }} />
                </Stack>
                <Stack>
                    {navDrawerItems.map((props) => <NavDrawerItems key={props.name} {...props} />)}
                </Stack>
            </Stack>
            <Typography variant='h5' fontSize={'1.1rem'} textAlign={'center'} sx={{ p: 2 }}>
                Developed By <Link target='blank' to={'https://www.linkedin.com/company/bytesbridge'} style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Bytes Bridge</Link>
            </Typography>
        </Drawer>
    )
}
