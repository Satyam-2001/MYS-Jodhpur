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
import { ElevatedButton, ElevatedStack } from '../../../UI/ElevatedComponents';
import CustomModal from '../../../UI/CustomModal';

const FormActionButton = styled(ElevatedButton)(() => ({
    fontSize: '1rem', minWidth: '120px', backgroundImage: 'var(--text-gradient)',
}))

function FormControlButtonGroup({ selectedStep, stepBack, stepNext, }) {
    return (
        <Stack direction={'row'} gap={4}>
            {selectedStep ?
                <FormActionButton onClick={stepBack} variant='contained' size='large' >
                    Back
                </FormActionButton>
                : undefined
            }
            <FormActionButton onClick={stepNext} variant='contained' size='large'>
                {selectedStep == 2 ? 'Submit' : 'Next'}
            </FormActionButton>
        </Stack>
    )
}

function CustomForm({ next, prev, selectedStep, inputField, active = false, component }) {
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
    // if (component) return component
    return (
        <Fragment>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                {stepData.inputField.map((field) => {
                    const { Component, ...props } = field
                    if (Component) {
                        return (
                            <Grid key={field.label} item xs={12} sm={6}>
                                <Component  {...props} formikState={formikState} />
                            </Grid>
                        )
                    }
                    return (
                        <Grid key={field.label} item xs={12} sm={6}>
                            <InputField  {...field} formikState={formikState} />
                        </Grid>
                    )
                })}
            </ Grid>
            <FormControlButtonGroup selectedStep={selectedStep} stepNext={handleSubmit} stepBack={prev} />
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

    // if (verifyUserByOtp) {
    //     return (

    //     )
    // }

    return (
        <Fragment>
            <CustomModal open={verifyUserByOtp} onClose={() => setVerifyUserByOtp(false)} sx={{ p: 0 }}>
                <VerificationForm formData={formData} />
            </CustomModal>
            <Container hideSideBar sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Stack className='hide-scroll-bar' py={2} gap={2} sx={{ alignItems: 'center', height: '100%', overflow: 'auto', width: '100%' }}>
                    {/* <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem' }} >
                    <span className='text-gradient'>Register</span>
                </Typography> */}
                    <Stepper sx={{ width: '100%' }} alternativeLabel activeStep={selectedStep} connector={<ColorlibConnector />}>
                        {registration_steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={(props) => <ColorlibStepIcon iconImage={registration_steps[index].icon} {...props} />}>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {error && <Typography color='error' sx={{ fontSize: '1rem' }}>{error}</Typography>}
                    <ElevatedStack p={{ xs: 1.5, md: 2 }} gap={3} mt={1} sx={{ bgcolor: 'rgba(100,100,100,0.02)', width: { xs: '95%', md: '70%', alignItems: 'center' } }}>
                        <Stack direction='row' gap={2} sx={{ alignItems: 'center' }}>
                            <Typography variant='h3' fontSize={'1.6rem'} fontWeight={600} sx={{ fontFamily: 'Lexend,sans-serif' }} >
                                <span className='text-gradient'>Step {selectedStep + 1}</span>
                            </Typography>
                            <Typography variant='h3' fontSize={'1.4rem'} fontWeight={500} sx={{ opacity: 0.6, fontFamily: 'Lexend,sans-serif' }} >
                                {registration_steps[selectedStep]['label']}
                            </Typography>
                        </Stack>
                        {registration_steps.map((step, index) => {
                            return <CustomForm key={step.label} active={selectedStep === index} next={stepNext} prev={stepBack} inputField={step.inputField} validationSchema={registerSchema[index]} selectedStep={index} component={step.component} />
                        })}
                    </ElevatedStack>
                    <Typography sx={{ fontSize: '0.9rem', fontFamily: 'Lexend,sans-serif' }}>
                        Already have an account? <Link href='/login'>Login</Link>
                    </Typography>
                </Stack>
            </Container>
        </Fragment>
    )
}