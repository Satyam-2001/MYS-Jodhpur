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
import IntrestRecieve from "./pages/Activity/Sections/IntrestRecieve";
import IntrestSent from "./pages/Activity/Sections/IntrestSent";
import MatchedProfiles from "./pages/Activity/Sections/MatchedProfiles";
import Settings from "./pages/Settings";
import Error from "./components/Error";

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
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/chats',
                element: <Chats />
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
                        path: 'intrests_sent',
                        element: <IntrestSent />
                    },
                    {
                        path: 'intrests_recieved',
                        element: <IntrestRecieve />
                    },
                    {
                        path: 'matched',
                        element: <MatchedProfiles />
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
                        element: <Profile />
                    }
                ]
            },
            {
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '*',
                element: <Error />,
            }
        ],
    }
])

export default router;
