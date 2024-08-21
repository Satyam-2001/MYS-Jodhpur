import React, { Fragment, useEffect, useState } from 'react'
import { Button, Divider, FormControl, FormHelperText, Grid, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../store/UserSlice'
import axios from '../../../services/axiosinstance'
import InputField from '../../../UI/InputField'
import { ElevatedStack } from '../../../UI/ElevatedComponents'
import { visibilityMenuItems } from '../../../data/selectionData'


export default function SettingsSelectInput({ title, field }) {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { mutate } = useMutation({
        mutationFn: (data) => axios.patch('/user/settings', { [field]: data }),
        onSuccess: (data) => {
            dispatch(userActions.setUser(data))
        }
    })

    const handleChange = (e) => {
        mutate(e.target.value)
    }

    return (
        <Stack direction={{ md: 'row' }} gap={2} sx={{ alignItems: { md: 'center' } }}>
            <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'} sx={{ width: { md: '45%' } }} >
                {title}
            </Typography>
            <ElevatedStack elevation={-1} sx={{ flex: 1 }}>
                <FormControl sx={{ borderRadius: 'inherit' }}>
                    <Select
                        value={user.settings?.[field] || 'Everybody'}
                        sx={{ fontSize: '1rem', borderRadius: 'inherit' }}
                        onChange={handleChange}
                        displayEmpty
                    >
                        {
                            visibilityMenuItems.map((value) => <MenuItem key={value} value={value} sx={{ fontSize: '1rem' }}>{value}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </ElevatedStack>
        </Stack>
    )
}