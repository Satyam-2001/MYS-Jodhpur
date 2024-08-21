import { Grid, Stack } from '@mui/material'
import React, { useContext } from 'react'
import AboutContainer from '../About/components/AboutContainer'
import EditContainer from '../About/components/EditContaioner'
import { ProfileContext } from '../../../context/ProfileProvider'
import InformationCard from '../../../components/InformationCard'
import { colors } from '../../../data/constants'
import InputField from '../../../UI/InputField'
import useUpdateProfile from '../About/hooks/useProfileUpdate'
import axios from '../../../services/axiosinstance'
import { preferenceSchema } from '../../../schemas/preferenceSchema'
import { education, employed_in, family_status, family_type, family_values, occupation } from '../../../data/selectionData'


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.preference || {},
        validationSchema: preferenceSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/preference', data)
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
            label: `Employeed In`,
            type: 'autocomplete',
            menuItems: employed_in,
            input_prop: { multiple: true },
        },
        {
            label: 'Occupation',
            type: 'autocomplete',
            menuItems: occupation,
            input_prop: {
                multiple: true,
                getOptionLabel: (option) => option.label,
                groupBy: (option) => option.category,
            }
        }
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
    const { profile } = useContext(ProfileContext)
    const { preference = {} } = profile

    const family = [
        {
            label: `Education`,
            value: preference.education
        },
        {
            label: `Employeed In`,
            value: preference.employeed_in
        },
        {
            label: `Occupation`,
            value: preference.occupation
        },
    ]
    return (
        <AboutContainer title={`Partener's Education & Career`} EditModal={EditModal} >
            <Grid container rowSpacing={{ xs: 1, md: 2 }} columnSpacing={4} pt={2} pb={1} px={1}>
                {family.map(({ label, value }, index) => (
                    <Grid item xs={12} md={6}>
                        <InformationCard key={label} label={label} value={value} defaultValue="Doesn't Matter" color={colors[index + 3]} />
                    </Grid>))}
            </Grid>
        </AboutContainer>
    )
}
