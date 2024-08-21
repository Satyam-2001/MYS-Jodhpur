import React, { useEffect, useState } from 'react'
import SideContainer from '../../../components/Layouts/SideContainer'
import { Tab, Tabs } from '@mui/material'
import { useSearchParams } from 'react-router-dom';
import DeclinedList from '../components/DeclinedList';

function a11yProps(index) {
    return {
        id: `declined-tab-${index}`,
        'aria-controls': `declined-tabpanel-${index}`,
    };
}

export default function Declined() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [value, setValue] = useState()

    useEffect(() => {
        const index = searchParams.get('q') === 'they' ? 1 : 0
        setValue(index)
    }, [searchParams])

    const handleChange = (event, index) => {
        setValue(index)
    }

    const header = {
        title: 'Declined Interests',
        goBack: true
    }

    return (
        <SideContainer header={header} sx={{ p: { xs: 0, md: 0.5 }, overflow: 'hidden' }} style={{ p: 1, gap: 1.5 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="I Declined" sx={{ flex: { xs: 1, md: 'none' } }} {...a11yProps(0)} />
                <Tab label="They Declined" sx={{ flex: { xs: 1, md: 'none' } }} {...a11yProps(1)} />
            </Tabs>
            <DeclinedList url={value === 0 ? 'you_declined' : 'they_declined'} />
        </SideContainer>
    )
}
