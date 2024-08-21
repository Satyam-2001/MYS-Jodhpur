import React, { useContext, useEffect } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Paper, Stack, Typography, makeStyles, menuItemClasses, useTheme } from '@mui/material'
import parameters, { getEducationParameters, getLifeStyleParameters, getParameters } from '../../../data/parameters'
import EditContainer from './components/EditContaioner'
import InputField from '../../../UI/InputField'
import { useFormik } from 'formik'
import { height, gender, manglik, martial_status, profile_managed_by, kundli_milan, weight_category, complexion, diet, disease, disability, drink, education, occupation, employed_in } from '../../../data/selectionData'
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


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.basic_info,
        validationSchema: basicInfoSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/basic_info', data)
    })

    const inputArray = [
        {
            label: 'Education',
            type: 'autocomplete',
            menuItems: education,
            input_prop: {
                multiple: true,
                getOptionLabel: (option) => option.label,
                groupBy: (option) => option.category,
            }
        },
        {
            label: 'Employed In',
            type: 'select',
            menuItems: employed_in,
        },
        {
            label: 'Occupation',
            type: 'autocomplete',
            menuItems: occupation,
            input_prop: {
                getOptionLabel: (option) => option.label,
                groupBy: (option) => option.category,
            }
        },
        { label: 'College' },
        { label: 'Company Name' },
        { label: 'Income', type: 'number', InputProps: { endAdornment: <Typography fontWeight={500}>lakhs</Typography> } },
    ]

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <Grid className='hide-scroll-bar' container overflow={'auto'}>
                {inputArray.map((item) => {
                    return (
                        <Grid key={item.label} item xs={12} md={item.md || 12} p={1}>
                            <InputField elevation={1} {...item} formikState={formikState} />
                        </Grid>
                    )
                })}
            </Grid>
        </EditContainer>
    )
}


export default function EducationAndCareer() {
    const theme = useTheme()
    const { profile } = useContext(ProfileContext)
    const basicInfo = getParameters(profile.basic_info || {}, { type: 'educational' })
    return (
        <AboutContainer title='Education & Career' EditModal={EditModal}>
            <Grid container pt={2} pb={1} spacing={1.5}>
                {basicInfo.map(({ Icon, value, label }, index) => {
                    const color = colors[(index + 6) % colors.length]
                    return (
                        <Grid key={label} item xs={6} sm={4}>
                            <ValueCard value={value} Icon={Icon} color={color} />
                        </Grid>
                    )
                })}
            </Grid>
        </AboutContainer>
    )
}
