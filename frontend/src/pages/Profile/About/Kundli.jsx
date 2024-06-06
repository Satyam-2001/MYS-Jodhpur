import React, { useContext, useEffect } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import moment from 'moment'
import { useFormik } from 'formik';
import InputField from '../../../UI/InputField';
import EditContainer from './components/EditContaioner';
import { kundli_milan } from '../../../data/selectionData';
import { ProfileContext } from '../../../context/ProfileProvider';
import useUpdateProfile from './hooks/useProfileUpdate';
import axios from '../../../services/axiosinstance'


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.basic_info,
        mutationFn: (data) => axios.patch('/user/basic_info', data)
    })

    const inputArray = [
        { label: 'Kundli Milan', type: 'select', menuItems: kundli_milan },
        { label: 'Place Of Birth' },
        { label: 'Date Of Birth', type: 'date' },
        { label: 'Time Of Birth', type: 'time' },
        { label: 'Gotra Self' },
        { label: 'Gotra Nanihal' },
    ]

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <Grid container overflow={'auto'}>
                {inputArray.map((item) => {
                    return (
                        <Grid key={item.label} item xs={12} md={item.md || 6} p={1}>
                            <InputField {...item} formikState={formikState} />
                        </Grid>
                    )
                })}
            </Grid>
        </EditContainer>
    )
}


function IconField({ Icon, children }) {
    return (
        <Stack component={Paper} direction='row' gap={2} sx={{ height: 52, width: 240, borderRadius: 30, bgcolor: 'var(--paper-color)', p: '3px', alignItems: 'center' }}>
            <Stack sx={{ height: 46, width: 46, bgcolor: 'primary.main', borderRadius: 26, alignItems: 'center', justifyContent: 'center' }}>
                <Icon sx={{ fontSize: 36, color: 'white' }} />
            </Stack>
            <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'}>{children}</Typography>
        </Stack>
    )
}

function ValueField({ value, children }) {
    return (
        <Stack component={Paper} direction='row' gap={2} sx={{ height: 52, width: 200, borderRadius: 30, bgcolor: 'var(--paper-color)', p: '3px', alignItems: 'center' }}>
            <Stack sx={{ height: 46, width: 76, bgcolor: 'primary.main', borderRadius: 26, alignItems: 'center', justifyContent: 'center' }}>
                <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'} sx={{ color: 'white' }}>{value}</Typography>
            </Stack>
            <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'}>{children}</Typography>
        </Stack>
    )
}

export default function Kundli() {
    const { profile } = useContext(ProfileContext)
    const basicInfo = profile.basic_info
    const birth_date = moment(new Date(basicInfo?.date_of_birth)).format('Do MMMM, YYYY')
    const birth_time = moment(new Date(basicInfo?.time_of_birth)).format('h:mm A')
    const birth_place = basicInfo?.place_of_birth
    return (
        <AboutContainer title='Kundli' isEditable EditModal={EditModal}>
            <Stack py={2} gap={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-around'}>
                <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography fontSize={'1.2rem'} fontWeight={600} sx={{ opacity: 0.8 }}>
                        Birth Details
                    </Typography>
                    <Stack gap={1} py={2} px={1}>
                        <IconField Icon={DateRangeIcon} >{birth_date}</IconField>
                        <IconField Icon={AccessTimeIcon} >{birth_time}</IconField>
                        <IconField Icon={PlaceIcon} >{birth_place}</IconField>
                    </Stack>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography fontSize={'1.2rem'} fontWeight={600} sx={{ opacity: 0.8 }}>
                        Gotra
                    </Typography>
                    <Stack gap={1} py={2} px={1}>
                        <ValueField value='Self'>{basicInfo.gotra_self || '-'}</ValueField>
                        <ValueField value='Nanihal'>{basicInfo.gotra_nanihal || '-'}</ValueField>
                    </Stack>
                </Paper>
            </Stack>
        </AboutContainer>
    )
}
