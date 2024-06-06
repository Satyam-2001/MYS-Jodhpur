import React, { useState } from 'react'
import RegisterationForm from './RegistrationForm'
import VerificationForm from './VerificationForm'
import { useMutation } from '@tanstack/react-query'
import axios from '../../services/axiosinstance'
import Container from '../../components/Layouts/Container'

export default function Register() {
    const [formData, setFormData] = useState()

    const { mutate: verifyOtpMutate } = useMutation({
        mutationFn: (data) => axios.post('/auth/otp', data),
        onSuccess: (data) => {
            console.log(data)
        },
    })

    const submitFormHandler = (formData) => {
        verifyOtpMutate(formData)
        setFormData(formData)
    }

    return (
        <Container hideSideBar sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {formData === undefined ?
                <RegisterationForm submitFormHandler={submitFormHandler} /> :
                <VerificationForm formData={formData} />
            }
        </Container>
    )
}
