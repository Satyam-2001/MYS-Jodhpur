import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Grid, Link, Typography } from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { registerSchema } from '../../../schemas/registerSchema';
import { useFormik } from 'formik'
import InputField from '../../../UI/InputField';
import { ColorlibConnector, ColorlibStepIcon } from '../../../UI/Stepper';
import registration_steps from './registration_steps';
import VerificationForm from '../VerificationForm'
import { useMutation } from '@tanstack/react-query'
import axios from '../../../services/axiosinstance'
import Container from '../../../components/Layouts/Container';

function FormControlButtonGroup({ selectedStep, stepBack, stepNext, }) {
    return (
        <Stack direction={'row'} gap={4}>
            {selectedStep ?
                <Button onClick={stepBack} variant='contained' size='large' sx={{ fontSize: '1rem' }} >
                    Back
                </Button>
                : undefined
            }
            <Button onClick={stepNext} variant='contained' size='large' sx={{ fontSize: '1rem' }}>
                {selectedStep == 3 ? 'Submit' : 'Next'}
            </Button>
        </Stack>
    )
}

function CustomForm({ next, prev, selectedStep, inputField, active = false }) {
    const stepData = registration_steps[selectedStep]
    const formikState =
        useFormik({
            initialValues: stepData.initialValues,
            validationSchema: registerSchema[selectedStep],
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                next(values)
            },
        });

    const { handleSubmit, errors, setValues } = formikState

    if (!active) return
    return (
        <Fragment>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {stepData.inputField.map((field) => {
                    return (
                        <Grid key={field.label} item xs={12} md={6} p={1} py={2}>
                            <InputField  {...field} formikState={formikState} />
                        </Grid>
                    )
                })}
            </ Grid>
            <FormControlButtonGroup selectedStep={selectedStep} stepNext={handleSubmit} stepBack={prev} />
            <Typography sx={{ my: 2, fontSize: '0.9rem', fontFamily: 'Lexend,sans-serif' }}>
                Already have an account? <Link href='/login'>Login</Link>
            </Typography>
        </Fragment>
    )
}

export default function RegisterationForm({ submitFormHandler }) {
    const [selectedStep, setSelectedStep] = useState(0)
    const [formData, setFormData] = useState({})
    const [verifyUserByOtp, setVerifyUserByOtp] = useState(false)
    const [error, setError] = useState(null)

    const { mutate: verifyOtpMutate } = useMutation({
        mutationFn: (data) => axios.post('/auth/otp/send', data),
        onSuccess: (data) => {
            setVerifyUserByOtp(true)
        },
        onError: (error) => {
            setError(error?.response?.data?.msg || 'Unknown Error Occured')
        }
    })

    const stepBack = (data) => {
        setFormData((prop) => { return { ...prop, ...data } })
        setSelectedStep((prop) => prop - 1)
    }

    const stepNext = (data) => {
        setFormData((prop) => { return { ...prop, ...data } })
        setSelectedStep((prop) => {
            if (prop + 1 === registration_steps.length) {
                verifyOtpMutate({ ...formData, ...data })
                return prop
            }
            return prop + 1
        })
    }

    // useEffect(() => {
    //     if (selectedStep === registration_steps.length) {
    //         verifyOtpMutate(formData)
    //     }
    // }, [selectedStep, formData])



    // const formComponent = useMemo(() => registration_steps.map((step, index) => {
    //     return <CustomForm next={stepNext} prev={stepBack} inputField={step.inputField} validationSchema={registerSchema[index]} selectedStep={index} />
    // }), [])

    if (verifyUserByOtp) {
        return (
            <Container hideSideBar sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <VerificationForm formData={formData} />
            </ Container >
        )
    }

    return (
        <Container hideSideBar sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Stack className='hide-scroll-bar' pt={4} gap={2} sx={{ alignItems: 'center', height: '100%', overflow: 'auto', width: '100%' }}>
                <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem' }} >
                    <span className='text-gradient'>Register</span>
                </Typography>
                <Stack direction='row' gap={2} mt={3}>
                    <Typography variant='h3' fontSize={'1.4rem'} fontWeight={500} >
                        Step {selectedStep + 1}
                    </Typography>
                    <Typography variant='h3' fontSize={'1.4rem'} fontWeight={500} sx={{ opacity: 0.6 }} >
                        {registration_steps[selectedStep]['label']}
                    </Typography>
                </Stack>
                <Stepper sx={{ width: '100%' }} alternativeLabel activeStep={selectedStep} connector={<ColorlibConnector />}>
                    {registration_steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={(props) => <ColorlibStepIcon iconImage={registration_steps[index].icon} {...props} />}>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {error && <Typography color='error' sx={{ fontSize: '1rem' }}>{error}</Typography>}
                <Stack py={2} sx={{ width: { xs: '90%', md: '70%', alignItems: 'center' } }}>
                    {registration_steps.map((step, index) => {
                        return <CustomForm key={step.label} active={selectedStep === index} next={stepNext} prev={stepBack} inputField={step.inputField} validationSchema={registerSchema[index]} selectedStep={index} />
                    })}
                </Stack>

            </Stack>
        </Container>
    )
}