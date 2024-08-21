import React, { useContext, useEffect } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Paper, Stack, Typography, makeStyles, menuItemClasses, useTheme } from '@mui/material'
import parameters, { getParameters } from '../../../data/parameters'
import EditContainer from './components/EditContaioner'
import InputField from '../../../UI/InputField'
import { useFormik } from 'formik'
import { height, gender, manglik, martial_status, profile_managed_by, kundli_milan, weight_category, complexion, diet, disease, disability, language } from '../../../data/selectionData'
import { useMutation } from '@tanstack/react-query'
import axios from '../../../services/axiosinstance'
import { queryClient } from '../../../services/http'
import { ProfileContext } from '../../../context/ProfileProvider'
import useUpdateProfile from './hooks/useProfileUpdate'
import { basicInfoSchema } from '../../../schemas/userSchema'
import chroma from 'chroma-js'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import RadialEffect from '../../../UI/RadialEffect'
import { colors } from '../../../data/constants'
import ValueCard from '../../../components/ValueCard'
import { filterProfileValue } from '../utils'


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.basic_info,
        validationSchema: basicInfoSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/basic_info', data)
    })

    const inputArray = [
        { label: 'Name' },
        { label: 'Date Of Birth', type: 'date' },
        { label: 'Gender', type: 'select', menuItems: gender, md: 6 },
        { label: 'Mother Tongue', type: 'select', menuItems: language, md: 6 },
        { label: 'Profile Managed By', type: 'select', menuItems: profile_managed_by, md: 12 },
        { label: 'Location', type: 'location', md: 6 },
        { label: 'Height', type: 'select', menuItems: height, md: 6 },
        { label: 'Weight Category', type: 'select', menuItems: weight_category, md: 4 },
        { label: 'Complexion', type: 'select', menuItems: complexion, md: 4 },
        { label: 'Manglik', type: 'select', menuItems: manglik, md: 4 },
        { label: 'Martial Status', type: 'select', menuItems: martial_status, md: 4 },
        { label: 'Disability', type: 'select', menuItems: disability, md: 4 },
        { label: 'Disease', type: 'select', menuItems: disease, md: 4 }
    ]

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <Grid className='hide-scroll-bar' container overflow={'auto'}>
                {inputArray.map((item) => {
                    return (
                        <Grid key={item.label} item xs={12} md={item.md || 6} p={1}>
                            <InputField elevation={1} {...item} formikState={formikState} />
                        </Grid>
                    )
                })}
            </Grid>
        </EditContainer>
    )
}

export default function BasicInfo() {
    const theme = useTheme()
    const { profile, isMe } = useContext(ProfileContext)
    const basicInfo = getParameters(profile.basic_info || {}, { type: 'personal' })
    const fields = filterProfileValue(basicInfo)

    if (!fields && !isMe) return

    return (
        <AboutContainer title='Personal Details' EditModal={EditModal}>
            <Grid container pt={2} pb={1} spacing={1.5}>
                {fields.map(({ Icon, value, label }, index) => {
                    const color = colors[index % colors.length]
                    return (
                        <Grid key={label} item xs={6} sm={4} md={3}>
                            <ValueCard value={value} Icon={Icon} color={color} />
                        </Grid>
                    )
                })}
            </Grid>
        </AboutContainer>
    )
}
