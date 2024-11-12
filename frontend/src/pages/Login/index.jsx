import { Button, Divider, Link, Paper, Stack, Typography } from '@mui/material'
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
import { ElevatedStack } from '../../UI/ElevatedComponents'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import { queryClient } from '../../services/http'
import { useGoogleLogin } from '@react-oauth/google'

import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useProtectedRoute('/profile')

    const { mutateAsync } = useMutation({
        mutationFn: (data) => axios.post('/auth/login', data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.some(key => key.includes('search')),
            });
        }
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
                navigate(`/profile`)
            }
            catch (e) {
                action.setStatus(e.response.data.msg || 'Something went wrong.')
            }
        }
    })

    const { mutate: googleSignInHandler } = useMutation({
        mutationFn: (data) => axios.post('auth/google-login', data),
        onSuccess: (data) => {
            dispatch(userActions.setUser(data))
            navigate(`/profile`)
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.some(key => key.includes('search')),
            });
        },
        onError: (data) => {
            formikState.setStatus('Something went wrong.')
        }
    })

    // This is the callback for Google One Tap login
    const signIn = useGoogleLogin({
        onSuccess: googleSignInHandler,
        onError: (error) => {
            console.error('Google login error:', error);
        },
        onNonOAuthError: (error) => {
            console.error('Google login error:', error);
        },
    });

    const handleGoogleLoginClick = () => {
        signIn();
    };


    const { handleSubmit, isSubmitting, status } = formikState
    return (
        <Container hideSideBar sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <ElevatedStack
                gap={2}
                sx={{
                    p: 3,
                    maxWidth: '90%',
                    width: '400px',
                    maxWidth: '100%',
                    alignItems: 'center'
                }}
            >
                <Typography variant='h3' fontSize={'2rem'} fontWeight={700} sx={{ opacity: 0.8, pb: 1 }} >
                    Login
                </Typography>
                <InputField label='Email' type='email' formikState={formikState} />
                <InputField label='Password' type='password' formikState={formikState} />
                {status && <Typography color='error'>{status}</Typography>}
                <Button fullWidth onClick={handleSubmit} disabled={isSubmitting} variant='contained' sx={{ fontSize: '1rem', mt: 2, backgroundImage: 'var(--text-gradient)' }}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <Divider sx={{ width: '100%' }}>
                    <Typography>
                        OR
                    </Typography>
                </Divider>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleGoogleLoginClick}
                    startIcon={
                        <GoogleIcon
                            sx={{
                                color: 'text.secondary', // Default color
                                mr: 1,
                            }}
                        />
                    }
                    // disabled={loading}
                    sx={{
                        py: 1,
                        px: 3,
                        fontSize: 16,
                        fontWeight: 400,
                        borderWidth: 1,
                        bgcolor: 'background.paper',
                        borderColor: 'divider',
                        color: 'text.secondary',
                        textTransform: 'none',
                        borderRadius: 30,
                        '&:hover': {
                            color: 'primary.main', // Change text color when hovered
                            borderColor: 'primary.main', // Change border color when hovered
                            '& .MuiSvgIcon-root': { // Target the icon inside the button
                                color: 'primary.main', // Change the icon color on hover
                            },
                        },
                    }}
                >
                    Continue with Google
                </Button>
                <Typography sx={{ mt: 2, fontSize: '0.9rem', fontFamily: 'Lexend,sans-serif' }}>
                    Don't have an account? <Link href='/register'>Register</Link>
                </Typography>
            </ElevatedStack>
        </Container >
    )
}
