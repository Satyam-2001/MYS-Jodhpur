import React, { useState } from 'react'
import RegisterationForm from './RegistrationForm'
import VerificationForm from './VerificationForm'
import { useMutation } from '@tanstack/react-query'
import axios from '../../services/axiosinstance'
import Container from '../../components/Layouts/Container'

export default function Register() {
    const [formData, setFormData] = useState()

    const { mutate: verifyOtpMutate } = useMutation({
        mutationFn: (data) => axios.post('/auth/otp/send', data),
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const submitFormHandler = (formData) => {
        verifyOtpMutate(formData)
        setFormData(formData)
    }

    return <RegisterationForm submitFormHandler={submitFormHandler} />

}
