import { Grid, Stack } from '@mui/material'
import React, { useContext } from 'react'
import BasicDetails from './BasicDetails'
import LifeStyle from './LifeStyle'
import Family from './Family'
import EducationAndCareer from './Education&Career'


export default function Preference() {

  return (
    <Stack className='hide-scroll-bar' p={1} gap={1} overflow={'auto'}>
      <BasicDetails />
      <EducationAndCareer />
      <LifeStyle />
      <Family />
    </Stack>
  )
}
