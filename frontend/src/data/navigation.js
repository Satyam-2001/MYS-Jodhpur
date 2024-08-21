import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';

const navigationList = [
    { name: 'Home', to: '/', icon: <HomeIcon fontSize='large' /> },
    // { name: 'Register', to: '/register', icon: <HowToRegIcon fontSize='large' /> },
    { name: 'Members', to: '/members'},
    { name: 'Search', to: '/search', icon: <SearchIcon fontSize='large' /> },
]

export const legalNavigationList = [
    { name: 'About Us', to: '/aboutus' },
    { name: 'Terms Of use', to: '/termsofuse' },
    { name: 'Privacy Policy', to: '/privacypolicy' },
]

export default navigationList