import React, { Fragment, useContext, useState } from 'react'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Avatar, Divider, Grid, Paper, Skeleton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import About from './About'
import Biodata from './Biodata'
import Images from './Images'
import RadialEffect from '../../UI/RadialEffect';
import Preference from './Preference';

function TabPanel({ value, index, children }) {
    if (value !== index) return <></>
    return children
}

export function MainSectionSkeleton() {
    return (
        <ElevatedStack
            sx={{
                flex: { md: 1 },
                p: 1,
                overflow: { xs: 'hidden', md: 'hidden' },
                // height: { xs: '50%', md: '100%' },
                borderRadius: { xs: 0, md: '10px' },
            }}
        >
            <Skeleton animation='wave' variant='rounded' sx={{ height: '100%', width: '100%' }} />
        </ElevatedStack>
    )
}

function CustomTab({ label, index, value, onClick }) {
    const isPressed = index === value
    return <ElevatedStack
        onClick={() => onClick(index)}
        elevation={isPressed ? -1 : 1}
        sx={{
            py: 1,
            px: 1.5,
            flex: 1,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: isPressed ? 'white' : 'text.primary',
            fontWeight: 450,
            fontSize: '0.95rem',
            fontFamily: 'Lexend,sans-serif',
            textAlign: 'center',
            textTransform: 'capitalize',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: isPressed ? 'primary.main' : null,
        }}
    >
        {label}
    </ElevatedStack>
}


export default function MainSection() {
    const theme = useTheme()
    const [value, setValue] = useState(0);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const profileMenuItems = [
        { label: 'About', Component: About },
        { label: 'Images', Component: Images },
        { label: 'Preference', Component: Preference },
        // { label: 'Bio Data', Component: Biodata },
    ]

    const childElement = (
        <Fragment>
            <Stack direction='row' gap={1} sx={{ position: { xs: 'sticky', md: 'flex' }, top: -1, zIndex: 1000, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', px: { xs: 1, md: 0 }, pt: { xs: 1, md: 0 }, pb: 1 }} >
                {profileMenuItems.map(({ label }, index) => <CustomTab key={label} index={index} label={label} value={value} onClick={handleChange} />)}
            </Stack>
            {profileMenuItems.map(({ label, Component }, index) => (
                <TabPanel key={label} value={value} index={index}>
                    <Component />
                </TabPanel>
            )
            )}
        </Fragment>
    )

    if (isMobile) {
        return <Stack sx={{ minHeight: '100%' }}>{childElement}</Stack>
    }

    return (
        <ElevatedStack
            className='hide-scroll-bar'
            sx={{
                p: 1,
                flex: 1,
                overflow: 'hidden',
                // height: '100%',
                borderRadius: '10px',
            }}
        >
            {childElement}
        </ElevatedStack>
    )
}
