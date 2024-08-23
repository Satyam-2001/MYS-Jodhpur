import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Register from './pages/Register'
import Search from './pages/Search'
import Chats from './pages/Chats'
import Profile from './pages/Profile'
import Login from "./pages/Login";
import Activity from "./pages/Activity";
import Shortlist from "./pages/Activity/Sections/Shortlist";
import InterestReceive from "./pages/Activity/Sections/InterestReceive";
import InterestSent from "./pages/Activity/Sections/InterestSent";
import MatchedProfiles from "./pages/Activity/Sections/MatchedProfiles";
import Settings from "./pages/Settings";
import ChatBlock from "./pages/Chats/ChatBlock";
import EmptyChatBlock from "./pages/Chats/EmptyChatBlock";
import Error from "./components/StatusMessage/Error";
import TermsOfUse from "./pages/Miscellaneous/TermsOfUse";
import Notifications from "./pages/Notifications";
import AboutUs from "./pages/Miscellaneous/AboutUs";
import Biodata from "./pages/Profile/Biodata";
import ImageGalleryPage from "./pages/Profile/Images/ImageGalleryPage";
import Declined from "./pages/Activity/Sections/Declined";
import AccountSection from "./pages/Settings/AccountSection";
import PrivacySection from "./pages/Settings/PrivacySection";
import HelpSection from "./pages/Settings/HelpSection";
import NotificationsSection from "./pages/Settings/NotificationsSection";
import PrivacyPolicy from "./pages/Miscellaneous/PrivacyPolicy";
import Members from "./pages/Members";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/search',
                element: <Search />,
            },
            {
                path: '/members',
                element: <Members />
            },
            {
                path: '/chats',
                element: <Chats />,
                children: [
                    {
                        index: true,
                        element: <EmptyChatBlock />
                    },
                    {
                        path: ':userId',
                        element: <ChatBlock />
                    }
                ]
            },
            {
                path: '/activity',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Activity />
                    },
                    {
                        path: 'shortlist',
                        element: <Shortlist />
                    },
                    {
                        path: 'interests_sent',
                        element: <InterestSent />
                    },
                    {
                        path: 'interests_received',
                        element: <InterestReceive />
                    },
                    {
                        path: 'matched',
                        element: <MatchedProfiles />
                    },
                    {
                        path: 'declined',
                        element: <Declined />
                    }
                ]
            },
            {
                path: '/profile',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Profile />
                    },
                    {
                        path: ':profileId',
                        element: <Profile />,
                        children: [
                            {
                                path: 'gallery',
                                element: <ImageGalleryPage />
                            },
                            {
                                path: 'biodata',
                                element: <Biodata />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/settings',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Settings />
                    },
                    {
                        path: 'account',
                        element: <AccountSection />
                    },
                    {
                        path: 'privacy',
                        element: <PrivacySection />
                    },
                    {
                        path: 'notifications',
                        element: <NotificationsSection />
                    },
                    {
                        path: 'help',
                        element: <HelpSection />
                    },
                ]
            },
            {
                path: '/termsofuse',
                element: <TermsOfUse />
            },
            {
                path: '/privacypolicy',
                element: <PrivacyPolicy />
            },
            {
                path: '/aboutus',
                element: <AboutUs />
            },
            {
                path: '/biodata',
                element: <Biodata />
            },
            {
                path: '*',
                element: <Error />,
            }
        ],
    }
])

export default router;
