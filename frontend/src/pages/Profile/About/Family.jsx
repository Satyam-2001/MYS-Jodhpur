import React, { useContext } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Stack, Typography, styled } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import useUpdateProfile from './hooks/useProfileUpdate';
import { ProfileContext } from '../../../context/ProfileProvider';
import axios from '../../../services/axiosinstance'
import EditContainer from './components/EditContaioner';
import InputField from '../../../UI/InputField';
import { familySchema } from '../../../schemas/userSchema';
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import RadialEffect from '../../../UI/RadialEffect';
import { colors } from '../../../data/constants';
import { family_status, family_type, family_values } from '../../../data/selectionData';
import InformationCard from '../../../components/InformationCard';
import { filterProfileValue } from '../utils';

function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.family || {},
        validationSchema: familySchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/family', data),
    })

    const inputArray = [
        { label: 'Family Status', type: 'select', menuItems: family_status },
        { label: 'Family Type', type: 'select', menuItems: family_type },
        { label: 'Family Values', type: 'select', menuItems: family_values },
        { label: 'Family Income', type: 'number', md: 6, InputProps: { endAdornment: <Typography fontWeight={500}>lakhs</Typography> } },
        { label: `Father's Name`, name: `father_name` },
        { label: `Father's Occupation`, name: `father_occupation` },
        { label: `Mother's Name`, name: `mother_name` },
        { label: `Mother's Occupation`, name: `mother_occupation` },
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

function IntroField(props) {
    return (
        <Grid item xs={12} md={6}>
            <InformationCard {...props} />
        </Grid>
    )
}

export default function Family() {

    const { profile, isMe } = useContext(ProfileContext)
    const family = profile.family || {}

    const familyItems = [
        {
            label: `Family Status`,
            value: family.family_status
        },
        {
            label: `Family Type`,
            value: family.family_type
        },
        {
            label: `Family Values`,
            value: family.family_values
        },
        {
            label: `Family Income`,
            value: family.family_income ? `${family.family_income} lakhs` : null
        },
        {
            label: `Father's Name`,
            value: family.father_name
        },
        {
            label: `Father's Occupation`,
            value: family.father_occupation
        },
        {
            label: `Mother's Name`,
            value: family.mother_name
        },
        {
            label: `Mother's Occupation`,
            value: family.mother_occupation
        },
    ]

    const fields = filterProfileValue(familyItems)

    if (!isMe && fields.length === 0) return

    return (
        <AboutContainer title='Family' EditModal={EditModal}>
            <Grid container rowSpacing={{ xs: 1, md: 2 }} columnSpacing={4} pt={2} pb={1} px={1}>
                {fields.map(({ label, value }, index) => <IntroField key={label} label={label} value={value} color={colors[index + 4]} />)}
            </Grid>
        </AboutContainer>
    )
}