import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LoginIcon from '@mui/icons-material/Login';

const sidebarNavigationList = [
    { name: 'Home', to: '/', Icon: HomeIcon, auth: false },
    { name: 'Search', to: '/search', Icon: SearchIcon },
    { name: 'Register', to: '/register', Icon: LoginIcon, auth: false },
    { name: 'Chats', to: '/chats', Icon: ChatBubbleOutlineOutlinedIcon, auth: true, badge: true },
    { name: 'Activity', to: '/activity', Icon: AccessTimeOutlinedIcon, auth: true },
    { name: 'Profile', to: '/profile', Icon: PermIdentityOutlinedIcon, md: false, auth: true },
    { name: 'Settings', to: '/settings', Icon: SettingsOutlinedIcon, auth: true }
]

export default sidebarNavigationList