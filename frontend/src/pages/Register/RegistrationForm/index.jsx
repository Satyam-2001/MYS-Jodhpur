import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Button, Grid, Link, Typography } from '@mui/material';
import { Fragment, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { registerSchema } from '../../../schemas/registerSchema';
import { useFormik } from 'formik'
import InputField from '../../../UI/InputField';
import { ColorlibConnector, ColorlibStepIcon } from '../../../UI/Stepper';
import registration_steps from './registration_steps';

const initialValues = {
    name: '',
    gender: 'Men',
    date_of_birth: dayjs('2000-01-01'),
    time_of_birth: dayjs('2001-01-01'),
    place_of_birth: '',
    email: '',
    phone_number: '',
    password: '',
    education: '',
    occupation: '',
    income: '',
    height: '',
    location: '',
    manglik: '',
    father_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
};

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

function CustomForm({ next, prev, selectedStep, inputField, validationSchema }) {
    const formikState =
        useFormik({
            initialValues,
            validationSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                next(values)
            },
        });

    const { handleSubmit, errors } = formikState
    return (
        <Fragment>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {inputField.map((field) => {
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
    const [formData, setFormData] = useState(initialValues)

    const stepBack = (data) => {
        setFormData((prop) => { return { ...prop, ...data } })
        setSelectedStep((prop) => prop - 1)
    }

    const stepNext = (data) => {
        setFormData((prop) => { return { ...prop, ...data } })
        setSelectedStep((prop) => prop + 1)
    }

    const formComponent = useMemo(() => registration_steps.map((step, index) => {
        return <CustomForm next={stepNext} prev={stepBack} inputField={step.inputField} validationSchema={registerSchema[index]} selectedStep={index} />
    }), [])

    if (selectedStep === registration_steps.length) {
        submitFormHandler(formData)
        return <></>
    }

    return (
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
            <Stack py={2} sx={{ width: { xs: '90%', md: '70%', alignItems: 'center' } }}>
                {formComponent[selectedStep]}
            </Stack>
        </Stack>
    )
}