import { Button, Link, Paper, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import InputField from '../../UI/InputField'
import { useFormik } from 'formik'
import Container from '../../components/Layouts/Container'
import { loginSchema } from '../../schemas/registerSchema'
import { useMutation } from '@tanstack/react-query'
import axios from '../../services/axiosinstance'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/UserSlice'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mutateAsync } = useMutation({
        mutationFn: (data) => axios.post('/auth/login', data)
    })

    const formikState = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, action) => {
            try {
                const { user, token } = await mutateAsync(values)
                dispatch(userActions.setUser({ user, token }))
                navigate('/profile')
            }
            catch (e) {
                action.setStatus(e.response.data.msg || 'Something went wrong.')
            }
        }
    })

    
    const { handleSubmit, isSubmitting, status } = formikState
    return (
        <Container hideSideBar sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ p: 3, maxWidth: '90%' }}>
                <Stack alignItems='center' gap={1} width='400px' maxWidth={'100%'}>
                    <Typography variant='h3' fontSize={'2rem'} fontWeight={700} sx={{ opacity: 0.8, pb: 1 }} >
                        Login
                    </Typography>
                    <InputField label='Email' type='email' formikState={formikState} />
                    <InputField label='Password' type='password' formikState={formikState} />
                    {status && <Typography color='error'>{status}</Typography>}
                    <Button fullWidth onClick={handleSubmit} disabled={isSubmitting} variant='contained' sx={{ fontSize: '1rem', mt: 2 }}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <Typography sx={{ mt: 2, fontSize: '0.9rem', fontFamily: 'Lexend,sans-serif' }}>
                        Don't have an account? <Link href='/register'>Register</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Container >
    )
}
