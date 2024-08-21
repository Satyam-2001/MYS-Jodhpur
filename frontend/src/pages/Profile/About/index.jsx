import React from 'react'
import BasicInfo from './BasicInfo'
import AboutContainer from './components/AboutContainer'
import { Stack } from '@mui/material'
import AboutMe from './AboutMe'
import Family from './Family'
import Kundli from './Kundli'
import Contact from './Contact'
import LifeStyle from './LifeStyle'
import EducationAndCareer from './EducationAndCareer'
import InstagramAuth from '../../../components/InstagramBasicDisplay'

export default function About() {
    return (
        <Stack className='hide-scroll-bar' p={1} gap={1} overflow={'auto'}>
            {/* <InstagramAuth /> */}
            <AboutMe />
            <BasicInfo />
            <EducationAndCareer />
            <LifeStyle />
            <Kundli />
            <Family />
            <Contact />
        </Stack>
    )
}
