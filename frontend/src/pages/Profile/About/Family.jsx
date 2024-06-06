import React, { useContext } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import useUpdateProfile from './hooks/useProfileUpdate';
import { ProfileContext } from '../../../context/ProfileProvider';
import axios from '../../../services/axiosinstance'
import EditContainer from './components/EditContaioner';
import InputField from '../../../UI/InputField';

function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.family || {},
        mutationFn: (data) => axios.patch('/user/family', data),
    })

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <InputField label='Father Name' formikState={formikState} />
            <InputField label='Father Occupation' formikState={formikState} />
            <InputField label='Mother Name' formikState={formikState} />
            <InputField label='Mother Occupation' formikState={formikState} />
        </EditContainer>
    )
}

function CustomText({ children }) {
    return (
        <Typography fontSize={'1rem'} fontWeight={500} fontFamily={'Lexend,sans-serif'}>
            {children}
        </Typography>
    )
}

function IntroField({ label, value }) {
    return (
        <Grid item xs={12} md={6}>
            <Stack direction='row' gap={2}>
                <Stack direction='row' justifyContent={'space-between'}>
                    <CustomText>
                        {label}
                    </CustomText>
                    <CustomText>
                        {':'}
                    </CustomText>
                </Stack>
                <CustomText>
                    {value || '-'}
                </CustomText>
            </Stack>
        </Grid>
    )
}

export default function Family() {

    const { profile } = useContext(ProfileContext)
    const family = profile.family || {}

    return (
        <AboutContainer title='Family' EditModal={EditModal}>
            <Grid container spacing={1} py={2} px={1}>
                <IntroField label={`Father's Name`} value={family.father_name} />
                <IntroField label={`Father's Occupation`} value={family.father_occupation} />
                <IntroField label={`Mother's Name`} value={family.mother_name} />
                <IntroField label={`Mother's Occupation`} value={family.mother_occupation} />
            </Grid>
        </AboutContainer>
    )
}