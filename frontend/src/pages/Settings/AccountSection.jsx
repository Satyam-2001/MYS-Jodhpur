import React, { Fragment, useEffect, useState } from 'react'
import Container from '../../components/Layouts/Container'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Button, Divider, FormControl, FormHelperText, Grid, IconButton, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/UserSlice'
import axios from '../../services/axiosinstance'
import CustomModal from '../../UI/CustomModal'
import { useFormik } from 'formik'
import InputField from '../../UI/InputField'
import changePasswordSchema from '../../schemas/changePasswordSchema'
import { useNavigate } from 'react-router'
import { ElevatedButton } from '../../UI/ElevatedComponents'
import { usePrivateRoute } from '../../hooks/useProtectedRoute'
import SideContainer from '../../components/Layouts/SideContainer'
import { Link } from 'react-router-dom'
import SettingsSelectInput from './components/SettingSelectInput'
import SettingCard from './components/SettingCard'
import { SideNavbarHeader } from '../../components/NavigatonBar/SideNavbar'
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCode from "react-qr-code";
import { Heading, elevation } from '../../theme/styles'
import { deleteMedia } from '../../services/uploadMedia'


function CustomButton({ children, sx = {}, ...props }) {
    return (
        <ElevatedButton fullWidth size='large' {...props} sx={{ fontSize: '1.1rem', textTransform: 'none', fontFamily: 'Lexend,sans-serif', ...sx }}>
            {children}
        </ElevatedButton>
    )
}

function ChangePassword() {
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)

    const openModalHandler = () => {
        setModalOpen(true)
    }

    const cloaseModalHandler = () => {
        setModalOpen(false)
    }
    const { mutateAsync } = useMutation({
        mutationFn: (password) => axios.patch('/user/password', { password }),
        onSuccess: (data) => {
            dispatch(userActions.setUser(data))
        }
    })
    const formikState = useFormik({
        initialValues: { password: '', confirm_password: '' },
        validationSchema: changePasswordSchema,
        onSubmit: async (values, action) => {
            try {
                await mutateAsync(values.password)
                action.resetForm()
                cloaseModalHandler()
            }
            catch (e) {
                action.setStatus('Unknown Error Occured')
            }
        }
    })

    const { handleSubmit, isSubmitting, status } = formikState

    return (
        <Fragment>
            <CustomModal open={modalOpen} onClose={cloaseModalHandler} sx={{ alignItems: 'center', gap: 1.5 }}>
                <Typography fontSize={'1.4rem'} fontFamily={'Lexend,sans-serif'} >
                    Change Password
                </Typography>
                <InputField label='Password' type='password' formikState={formikState} />
                <InputField label='Confirm Password' type='password' formikState={formikState} />
                {status && <Typography color='error'>{status}</Typography>}
                <Stack direction='row' gap={1} mt={3} mb={1} width='100%'>
                    <CustomButton sx={{ color: 'text.primary', bgcolor: 'background.default' }} onClick={cloaseModalHandler} >
                        Cancel
                    </CustomButton>
                    <CustomButton variant='contained' disabled={isSubmitting} fullWidth sx={{ bgcolor: 'primary.main' }} onClick={handleSubmit}>
                        {isSubmitting ? 'Updating...' : 'Change'}
                    </CustomButton>
                </Stack>
            </CustomModal>
            <CustomButton sx={{ color: 'text.primary', bgcolor: 'background.default' }} onClick={openModalHandler} >
                Change Password
            </CustomButton>
        </Fragment>
    )
}

function LogoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
        mutationFn: () => axios.post('/auth/logout')
    })
    const logoutHandler = async () => {
        await mutateAsync()
        dispatch(userActions.signout())
        navigate('/')
    }
    return (
        <CustomButton variant='contained' sx={{ color: 'white' }} onClick={logoutHandler} >
            Logout
        </CustomButton>
    )
}

function DeleteProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [modalOpen, setModalOpen] = useState(false)

    console.log(user.images)

    const { mutate: deleteUserHandler, isPending } = useMutation({
        mutationFn: () => axios.delete('/auth'),
        onSuccess: async () => {
            try {
                const response = await Promise.all(user.images.map(async (image) => {
                    const res = await deleteMedia(image)
                    return res
                }))
                console.log(user.images, response)
            } catch (e) {
                console.log(e)
            }
            dispatch(userActions.signout())
            navigate('/')
        }
    })

    const openModalHandler = () => {
        setModalOpen(true)
    }

    const cloaseModalHandler = () => {
        setModalOpen(false)
    }

    return (
        <Fragment>
            <CustomModal open={modalOpen} onClose={cloaseModalHandler}>
                <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'} >
                    Are you sure you want to delete your profile?
                </Typography>
                <Stack direction='row' gap={1} mt={3} mb={1}>
                    <CustomButton sx={{ color: 'text.primary', bgcolor: 'background.default' }} onClick={cloaseModalHandler} >
                        Cancel
                    </CustomButton>
                    <CustomButton variant='contained' disabled={isPending} fullWidth color='error' onClick={deleteUserHandler}>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </CustomButton>
                </Stack>
            </CustomModal>
            <CustomButton variant='contained' fullWidth color='error' onClick={openModalHandler}>
                Delete Profile
            </CustomButton>
        </Fragment>
    )
}

function AccountInfo() {
    const [open, setOpen] = useState(false)
    const { user } = useSelector(state => state.user)
    const url = `https://www.mys-shaadi.com/profile/${user._id}`


    return (
        <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <CustomModal open={open} onClose={() => setOpen(false)} sx={{ p: 2, alignItems: 'center', gap: 2 }}>
                <Heading sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', textAlign: 'center' }}>QR code</Heading>
                <Stack gap={1.5} sx={{ alignItems: 'center' }}>
                    <QRCode value={url} style={{ borderRadius: '10px', boxShadow: elevation().xs }} />
                    <Stack sx={{ alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '1rem', fontFamily: 'Lexend,sans-serif' }}>{user?.basic_info?.name}</Typography>
                        <Typography sx={{ fontSize: '0.9rem', fontFamily: 'Lexend,sans-serif' }}>Profile Id : {user?._id}</Typography>
                    </Stack>
                </Stack>
            </CustomModal>
            <SideNavbarHeader />
            <IconButton onClick={() => setOpen(true)}>
                <QrCodeIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            </IconButton>
        </Stack>
    )
}

export default function AccountSection() {
    const header = {
        title: 'Account',
        goBack: true
    }

    return (
        <SideContainer header={header}>
            <Grid container rowSpacing={2} >
                <Grid item xs={12} md={8} p={1} >
                    <AccountInfo />
                    <Divider sx={{ mt: 1.5 }} />
                </Grid>
                <Grid item xs={12} md={8} p={1} >
                    <ChangePassword />
                </Grid>
                <Grid item xs={12} md={8} p={1} >
                    <LogoutButton />
                </Grid>
                <Grid item xs={12} md={8} p={1} >
                    <DeleteProfile />
                </Grid>
            </Grid>
        </SideContainer>
    )
}
