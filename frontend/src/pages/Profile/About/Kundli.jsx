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
import { kundliSchema } from '../../../schemas/userSchema';
import ValueCard from '../../../components/ValueCard';
import { colors } from '../../../data/constants';
import { filterProfileValue } from '../utils';


function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.basic_info,
        validationSchema: kundliSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/basic_info', data)
    })

    const inputArray = [
        { label: 'Time Of Birth', type: 'time' },
        { label: 'Date Of Birth', type: 'date' },
        { label: 'Place Of Birth', md: 12 },
    ]




    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <Grid container overflow={'auto'}>
                {inputArray.map((item) => {
                    return (
                        <Grid key={item.label} item xs={12} md={item.md || 6} p={1}>
                            <InputField elevation={1} {...item} formikState={formikState} />
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
    const { profile, isMe } = useContext(ProfileContext)
    const basicInfo = profile.basic_info
    const birth_date = basicInfo?.date_of_birth ? moment(new Date(basicInfo?.date_of_birth)).format('Do MMM, YYYY') : null
    const birth_time = basicInfo?.time_of_birth ? moment(new Date(basicInfo?.time_of_birth)).format('h:mm A') : null
    const birth_place = basicInfo?.place_of_birth

    const values = [
        { label: 'time', value: birth_time, Icon: AccessTimeIcon },
        { label: 'date', value: birth_date, Icon: DateRangeIcon },
        { label: 'place', value: birth_place, Icon: PlaceIcon },
    ]

    const fields = filterProfileValue(values)

    if (!isMe && fields.length === 0) return

    return (
        <AboutContainer title='Birth Details' isEditable EditModal={EditModal}>
            {/* <Stack py={2} px={1} gap={1} direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={'space-around'}>
                {values.map(({ value, Icon }, index) => <ValueCard key={value} value={value} Icon={Icon} color={colors[index]} sx={{ width: { xs: '100%', md: '30%' } }} />)}
            </Stack> */}
            <Grid container pt={2} pb={1} spacing={1.5}>
                {values.filter(({ value }) => value).map(({ Icon, value, label }, index) => {
                    const color = colors[index % colors.length]
                    return (
                        <Grid key={label} item xs={6} sm={4}>
                            <ValueCard value={value} Icon={Icon} color={color} />
                        </Grid>
                    )
                })}
            </Grid>
        </AboutContainer>
    )
}
