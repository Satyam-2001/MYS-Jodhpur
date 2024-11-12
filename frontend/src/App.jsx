import React, { Fragment, useEffect } from 'react';
import { Stack, useTheme } from "@mui/material";
import { Outlet } from 'react-router';
import useFetchData from './hooks/useFetchData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCapacitorApp from './hooks/useCapacitorApp';

import { GoogleOAuthProvider } from '@react-oauth/google';

window.Buffer = window.Buffer || require("buffer").Buffer;

function App(props) {

    const theme = useTheme()

    useFetchData()
    useCapacitorApp()

    return (
        <GoogleOAuthProvider clientId="368591574569-dg1d1555eliucla4p77rvdquliqcfa40.apps.googleusercontent.com">
            <ToastContainer toastStyle={{ backgroundColor: theme.palette.background.default }} />
            <Outlet />
        </GoogleOAuthProvider>
    )
}

export default App