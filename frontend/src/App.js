import React from 'react';
import { Stack } from "@mui/material";
import { Outlet } from 'react-router';
import useFetchData from './hooks/useFetchData';

window.Buffer = window.Buffer || require("buffer").Buffer;

function App(props) {

    useFetchData()

    return <Outlet />
}

export default App