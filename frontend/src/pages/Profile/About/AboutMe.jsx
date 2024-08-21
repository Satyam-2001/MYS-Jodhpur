import React, { useContext, useEffect } from 'react'
import AboutContainer from './components/AboutContainer'
import { Stack, Typography } from '@mui/material'
import EditContainer from './components/EditContaioner'
import InputField from '../../../UI/InputField'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import axios from '../../../services/axiosinstance'
import { queryClient } from '../../../services/http'
import { ProfileContext } from '../../../context/ProfileProvider'
import useUpdateProfile from './hooks/useProfileUpdate'
import { aboutMeSchema } from '../../../schemas/userSchema'


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.about_me || {},
        validationSchema: aboutMeSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/about_me', data),
    })

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <InputField label='Bio' multiline rows={5} formikState={formikState} />
        </EditContainer>
    )
}

export default function AboutMe() {
    const { profile } = useContext(ProfileContext)
    const profile_managed_by = profile?.basic_info?.profile_managed_by
    const description = profile?.about_me?.bio
    return (
        <AboutContainer title='About Me' EditModal={EditModal}>
            <Stack py={1} gap={1} justifyContent={description && 'center'} width='100%' sx={{ color: 'text.primary', whiteSpace: 'pre-line' }}>
                {/* <Typography sx={{ fontSize: '1rem', fontFamily: 'Lexend,sans-serif' }}>Profile Managed By {profile_managed_by}</Typography> */}
                {description || <Typography sx={{ opacity: '0.6', fontSize: '1rem', fontFamily: 'Lexend' }}>No Bio Available</Typography>}
            </Stack>
        </AboutContainer>
    )
}
