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
import InterestRecieve from "./pages/Activity/Sections/InterestRecieve";
import InterestSent from "./pages/Activity/Sections/InterestSent";
import MatchedProfiles from "./pages/Activity/Sections/MatchedProfiles";
import Settings from "./pages/Settings";
import Error from "./components/Error";
import ChatBlock from "./pages/Chats/ChatBlock";
import EmptyChatBlock from "./pages/Chats/EmptyChatBlock";
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
                        path: 'interests_recieved',
                        element: <InterestRecieve />
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
