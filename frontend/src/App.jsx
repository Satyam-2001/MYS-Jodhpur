import React, { Fragment, useEffect } from 'react';
import { Stack, useTheme } from "@mui/material";
import { Outlet } from 'react-router';
import useFetchData from './hooks/useFetchData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCapacitorApp from './hooks/useCapacitorApp';

window.Buffer = window.Buffer || require("buffer").Buffer;

function App(props) {

    const theme = useTheme()

    useFetchData()
    useCapacitorApp()

    return (
        <Fragment>
            <ToastContainer toastStyle={{ backgroundColor: theme.palette.background.default }} />
            <Outlet />
        </Fragment>
    )
}

export default App