import React from 'react'
import BasicInfo from './BasicInfo'
import AboutContainer from './components/AboutContainer'
import { Stack } from '@mui/material'
import AboutMe from './AboutMe'
import Family from './Family'
import Kundli from './Kundli'
import Contact from './Contact'

export default function About() {
    return (
        <Stack className='hide-scroll-bar' py={2} px={1} gap={1} overflow={'auto'}>
            <BasicInfo />
            <AboutMe />
            <Kundli />
            <Family />
            <Contact />
        </Stack>
    )
}
