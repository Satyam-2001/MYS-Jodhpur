import { Grid, Stack } from '@mui/material'
import React, { useContext } from 'react'
import AboutContainer from '../About/components/AboutContainer'
import EditContainer from '../About/components/EditContaioner'
import { ProfileContext } from '../../../context/ProfileProvider'
import InformationCard from '../../../components/InformationCard'
import { colors } from '../../../data/constants'
import { diet, drink } from '../../../data/selectionData'
import { preferenceSchema } from '../../../schemas/preferenceSchema'
import useUpdateProfile from '../About/hooks/useProfileUpdate'
import InputField from '../../../UI/InputField'
import axios from '../../../services/axiosinstance'

function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.preference || {},
        validationSchema: preferenceSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/preference', data)
    })

    const inputArray = [
        { label: 'Diet', type: 'autocomplete', menuItems: diet, input_prop: { multiple: true }, md: 12 },
        { label: 'Drinks', type: 'autocomplete', menuItems: drink, input_prop: { multiple: true }, md: 12 },
        { label: 'Smoke', type: 'autocomplete', menuItems: drink, input_prop: { multiple: true }, md: 12 },
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

export default function LifeStyle() {
    const { profile } = useContext(ProfileContext)
    const { preference = {} } = profile
    const life_style = [
        { label: 'Diet', value: preference.diet },
        { label: 'Drink', value: preference.drinks },
        { label: 'Smoke', value: preference.smoke },
    ]
    return (
        <AboutContainer title={`Partener's Life Style`} EditModal={EditModal} >
            <Grid container rowSpacing={{ xs: 1, md: 2 }} columnSpacing={4} pt={2} pb={1} px={1}>
                {life_style.map(({ label, value }, index) => (
                    <Grid item xs={12} md={6}>
                        <InformationCard key={label} label={label} value={value} defaultValue="Doesn't Matter" color={colors[index + 6]} />
                    </Grid>))}
            </Grid>
        </AboutContainer>
    )
}
