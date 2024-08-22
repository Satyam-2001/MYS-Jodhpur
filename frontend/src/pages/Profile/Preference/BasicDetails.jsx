import { Grid, Stack } from '@mui/material'
import React, { useContext } from 'react'
import AboutContainer from '../About/components/AboutContainer'
import EditContainer from '../About/components/EditContaioner'
import { ProfileContext } from '../../../context/ProfileProvider'
import InformationCard from '../../../components/InformationCard'
import { colors } from '../../../data/constants'
import useUpdateProfile from '../About/hooks/useProfileUpdate'
import { complexion, diet, language, manglik, martial_status, weight_category } from '../../../data/selectionData'
import axios from '../../../services/axiosinstance'
import { preferenceSchema } from '../../../schemas/preferenceSchema'
import InputField from '../../../UI/InputField'
import { ageFormat, heightFormat, incomeFormat, max_age, max_height, max_income, min_age, min_height, min_income } from '../../../utils'

function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.preference || {},
        validationSchema: preferenceSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/preference', data)
    })

    const inputArray = [
        { label: 'Age', type: 'range', min: 18, max: 60, md: 12 },
        { label: 'Height', type: 'range', min: 48, max: 100, format: heightFormat, md: 12 },
        { label: 'Income', type: 'range', min: 1, max: 100, format: incomeFormat, md: 12 },
        { label: 'Location', type: 'location' },
        { label: 'Mother Tongue', type: 'autocomplete', menuItems: language, input_prop: { multiple: true }, md: 12 },
        { label: 'Manglik', type: 'autocomplete', menuItems: manglik, input_prop: { multiple: true }, md: 12 },
        { label: 'Martial Status', type: 'autocomplete', menuItems: martial_status, input_prop: { multiple: true }, md: 12 },
        { label: 'Complexion', type: 'autocomplete', menuItems: complexion, input_prop: { multiple: true }, md: 12 },
        { label: 'Weight Category', type: 'autocomplete', menuItems: weight_category, input_prop: { multiple: true }, md: 12 },
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

export default function BasicDetails() {
    const { profile } = useContext(ProfileContext)
    const { preference = {} } = profile
    const basic_details = [
        { label: 'Age', value: `${ageFormat(preference.min_age || min_age)} - ${ageFormat(preference.max_age || max_age)}` },
        { label: 'Height', value: `${heightFormat(preference.min_height || min_height)} - ${heightFormat(preference.max_height || max_height)}` },
        { label: 'Income', value: `${incomeFormat(preference.min_income || min_income)} - ${incomeFormat(preference.max_income || max_income)}` },
        { label: 'Location', value: (preference.location || '').split(',')[0] },
        { label: 'Martial Status', value: preference.martial_status },
        { label: 'Manglik', value: preference.manglik },
        { label: 'Mother Tongue', value: preference.mother_tongue },
        { label: 'Complexion', value: preference.complexion },
        { label: 'Weight Category', value: preference.weight_category },
    ]
    return (
        <AboutContainer title={`Partner's Basic Details`} EditModal={EditModal} >
            < Grid container rowSpacing={{ xs: 1, md: 2 }} columnSpacing={4} pt={2} pb={1} px={1} >
                {
                    basic_details.map(({ label, value }, index) => (
                        <Grid item xs={12} md={6}>
                            <InformationCard key={label} label={label} value={value} defaultValue="Doesn't Matter" color={colors[index]} />
                        </Grid>))
                }
            </Grid >
        </AboutContainer >
    )
}
