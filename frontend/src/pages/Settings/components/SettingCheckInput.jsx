import React, { Fragment, useEffect, useState } from 'react'
import { Stack, Switch, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../store/UserSlice'
import axios from '../../../services/axiosinstance'


export default function SettingCheckInput({ title, subtitle, field }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [checked, setChecked] = useState(user?.settings?.[field])

    const { mutate } = useMutation({
        mutationFn: (data) => axios.patch('/user/settings', { [field]: data }),
        onMutate: (data) => {
            setChecked(data)
        },
        onSuccess: (data) => {
            dispatch(userActions.setUser(data))
        }
    })

    const handleChange = (event) => {
        mutate(event.target.checked)
    }

    useEffect(() => {
        setChecked(user?.settings?.[field])
    }, [user?.settings?.[field]])

    return (
        <Stack direction='row' sx={{
            gap: {
                xs: 1, md: 2
            },
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        }}>
            <Stack>
                <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'} >
                    {title}
                </Typography>
                <Typography fontSize={'0.8rem'} sx={{ opacity: 0.9 }} fontFamily={'Lexend,sans-serif'} >
                    {subtitle}
                </Typography>
            </Stack>
            <Switch
                defaultChecked
                checked={checked}
                onChange={handleChange}
            />
        </Stack >
    )
}
