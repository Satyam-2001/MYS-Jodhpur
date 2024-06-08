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
            <InputField label='About Me' multiline rows={5} formikState={formikState} />
        </EditContainer>
    )
}

export default function AboutMe() {
    const { profile } = useContext(ProfileContext)
    const description = profile?.about_me?.about_me
    return (
        <AboutContainer title='About Me' EditModal={EditModal}>
            <Stack py={2} justifyContent={description && 'center'} width='100%'>
                {description || <Typography sx={{ opacity: '0.6', fontSize: '1.3rem', fontWeight: 600 }}>No Description</Typography>}
            </Stack>
        </AboutContainer>
    )
}
