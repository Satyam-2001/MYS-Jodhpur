import React, { Fragment, useEffect, useState } from 'react'
import Container from '../../components/Layouts/Container'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Button, Divider, FormControl, FormHelperText, Grid, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingCard from './components/SettingCard'

function ShowActivityStatus() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [checked, setChecked] = useState(user?.settings?.show_activity_status)

  const { mutate } = useMutation({
    mutationFn: (data) => axios.patch('/user/settings', { show_activity_status: data }),
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
    setChecked(user?.settings?.show_activity_status)
  }, [user?.settings?.show_activity_status])
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
          Show Activity Status
        </Typography>
        <Typography fontSize={'0.8rem'} sx={{ opacity: 0.9 }} fontFamily={'Lexend,sans-serif'} >
          Allow accounts to see when you were last active or are currently active. When this is turned off, other accounts won't be able to see the activity status of your account.
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

export default function Settings() {
  const header = {
    title: 'Settings',
  }

  usePrivateRoute()

  const settingsList = [
    {
      title: 'Account',
      subtitle: 'Change Password, Logout, Delete Profile',
      Icon: AccountCircleOutlinedIcon,
      to: 'account',
    },
    {
      title: 'Privacy',
      subtitle: 'Contact/ Name/ Image Visibility, Activity status',
      Icon: LockOutlinedIcon,
      to: 'privacy',
    },
    {
      title: 'Notifications',
      subtitle: 'Email/ Chat Notification, Mute Notificatons',
      Icon: NotificationsOutlinedIcon,
      to: 'notifications',
    },
    {
      title: 'Help',
      subtitle: 'Contact Us, Privacy Policy, Terms of use',
      Icon: HelpOutlineOutlinedIcon,
      to: 'help',
    },
  ]

  return (
    <SideContainer header={header}>
      <Grid container rowSpacing={2} >
        {
          settingsList.map((props) => (
            <Grid key={props.title} item xs={12} md={8} >
              <SettingCard {...props} />
            </Grid>
          ))
        }
      </Grid>
    </SideContainer >
  )
}
