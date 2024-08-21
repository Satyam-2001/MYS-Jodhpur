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
import { family_status, family_type, family_values } from '../../../data/selectionData'


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.preference || {},
        validationSchema: preferenceSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/preference', data)
    })

    const inputArray = [
        { label: 'Family Status', type: 'autocomplete', menuItems: family_status, input_prop: { multiple: true }, md: 12 },
        { label: 'Family Type', type: 'autocomplete', menuItems: family_type, input_prop: { multiple: true }, md: 12 },
        { label: 'Family Values', type: 'autocomplete', menuItems: family_values, input_prop: { multiple: true }, md: 12 },
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

export default function Family() {
    const { profile } = useContext(ProfileContext)
    const { preference = {} } = profile

    const family = [
        {
            label: `Family Status`,
            value: preference.family_status
        },
        {
            label: `Family Type`,
            value: preference.family_type
        },
        {
            label: `Family Values`,
            value: preference.family_values
        },
    ]
    return (
        <AboutContainer title={`Partener's Family`} EditModal={EditModal} >
            <Grid container rowSpacing={{ xs: 1, md: 2 }} columnSpacing={4} pt={2} pb={1} px={1}>
                {family.map(({ label, value }, index) => (
                    <Grid item xs={12} md={6}>
                        <InformationCard key={label} label={label} value={value} defaultValue="Doesn't Matter" color={colors[index]} />
                    </Grid>))}
            </Grid>
        </AboutContainer>
    )
}
