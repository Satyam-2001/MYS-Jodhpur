import React, { useContext, useEffect } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Stack, Typography, menuItemClasses, useTheme } from '@mui/material'
import parameters, { getParameters } from '../../../data/parameters'
import EditContainer from './components/EditContaioner'
import InputField from '../../../UI/InputField'
import { useFormik } from 'formik'
import { height, gender, manglik, martial_status, profile_managed_by, kundli_milan, weight_category, color, diet, disease, disability } from '../../../data/selectionData'
import { useMutation } from '@tanstack/react-query'
import axios from '../../../services/axiosinstance'
import { queryClient } from '../../../services/http'
import { ProfileContext } from '../../../context/ProfileProvider'
import useUpdateProfile from './hooks/useProfileUpdate'


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.basic_info,
        mutationFn: (data) => axios.patch('/user/basic_info', data)
    })

    const inputArray = [
        { label: 'Name' },
        { label: 'Date Of Birth', type: 'date' },
        { label: 'Gender', type: 'select', menuItems: gender, md: 6 },
        { label: 'Profile Managed By', type: 'select', menuItems: profile_managed_by, md: 6 },
        { label: 'Education', md: 6 },
        { label: 'Occupation', md: 6 },
        { label: 'Income', type: 'number', md: 6, InputProps: { endAdornment: <Typography fontWeight={500}>lakhs</Typography> } },
        { label: 'Location', md: 6 },
        { label: 'Height', type: 'select', menuItems: height, md: 4 },
        { label: 'Weight Category', type: 'select', menuItems: weight_category, md: 4 },
        { label: 'Color', type: 'select', menuItems: color, md: 4 },
        { label: 'Manglik', type: 'select', menuItems: manglik, md: 4 },
        { label: 'Martial Status', type: 'select', menuItems: martial_status, md: 4 },
        { label: 'Disability', type: 'select', menuItems: disability, md: 4 },
        { label: 'Diet', type: 'select', menuItems: diet },
        { label: 'Disease', type: 'select', menuItems: disease }

    ]

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <Grid className='hide-scroll-bar' container overflow={'auto'}>
                {inputArray.map((item) => {
                    return (
                        <Grid key={item.label} item xs={12} md={item.md || 6} p={1}>
                            <InputField {...item} formikState={formikState} />
                        </Grid>
                    )
                })}
            </Grid>
        </EditContainer>
    )
}

export default function BasicInfo() {
    const theme = useTheme()
    const { profile } = useContext(ProfileContext)
    const basicInfo = profile.basic_info
    return (
        <AboutContainer title='Basic info' EditModal={EditModal}>
            <Grid container py={2}>
                {getParameters(basicInfo).map(({ Icon, value }) => {
                    return (
                        <Grid key={value} item xs={12} sm={6} md={4}>
                            <Stack direction='row' gap={2} key={value} p={'3px'}>
                                <Icon sx={{ fontSize: 28, color: theme.palette.text.primary }} />
                                <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'}>
                                    {value}
                                </Typography>
                            </Stack>
                        </Grid>
                    )
                })}
            </Grid>
        </AboutContainer>
    )
}
