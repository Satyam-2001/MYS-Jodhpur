import React, { useContext, useState } from 'react'
import Block from '../../UI/Block'
import { Avatar, Divider, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import About from './About'
import Biodata from './Biodata'
import Images from './Images'

function TabPanel({ value, index, children }) {
    if (value !== index) return <></>
    return children
}

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`,
    };
}


export default function MainSection() {
    const theme = useTheme()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Block sx={{ flex: { md: 1 }, flexShrink: 0, px: 1, overflow: { md: 'hidden' }, height: { xs: '100%', md: undefined } }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="About" {...a11yProps(0)} />
                <Tab label="Images" {...a11yProps(1)} />
                <Tab label="Bio Data" {...a11yProps(2)} />
            </Tabs>
            <Divider />
            <TabPanel value={value} index={0}>
                <About />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Images />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Biodata />
            </TabPanel>
        </Block>
    )
}
