import React, { Fragment, useContext } from 'react'
import AboutContainer from './components/AboutContainer'
import { Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import useUpdateProfile from './hooks/useProfileUpdate';
import { ProfileContext } from '../../../context/ProfileProvider';
import axios from '../../../services/axiosinstance'
import EditContainer from './components/EditContaioner';
import InputField from '../../../UI/InputField';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.contact,
        mutationFn: (data) => axios.patch('/user/contact', data),
    })

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <InputField label='Phone Number' type='tel' formikState={formikState} />
            <InputField label='Alternate Phone Number' type='tel' formikState={formikState} />
            <InputField label='Address' formikState={formikState} />
            <InputField label='Instagram' formikState={formikState} />
            <InputField label='Facebook' formikState={formikState} />
        </EditContainer>
    )
}

function ContactItem({ Icon, children }) {
    if (!children) return
    return (
        <Stack direction='row' gap={2} alignItems={'center'}>
            <Icon sx={{ fontSize: 32 }} />
            <Typography textOverflow={'ellipsis'} fontSize={'1.1rem'} fontFamily={'Lexend,sans-serif'}>{children}</Typography>
        </Stack>
    )
}

function HideContact() {
    return (
        <Stack gap={2} direction='row' alignItems={'center'} justifyContent={'center'}>
            <VisibilityOffIcon sx={{ fontSize: '3rem', opacity: '0.6' }} />
            <Typography sx={{ fontSize: '2rem', opacity: '0.6' }}>
                Hidden Data
            </Typography>
        </Stack>
    )
}

export default function Contact() {

    const { profile } = useContext(ProfileContext)
    const contact = profile.contact
    const isHidden = contact === 'hidden'

    const email = contact?.email
    const phone_number = contact?.phone_number
    const address = contact?.address

    return (
        <AboutContainer title='Contact' EditModal={EditModal}>
            <Stack py={2} px={1} gap={1} overflow='hidden'>
                {isHidden ?
                    <HideContact /> :
                    <Fragment>
                        <ContactItem Icon={EmailIcon}>{email}</ContactItem>
                        <ContactItem Icon={PhoneIcon}>{phone_number}</ContactItem>
                        <ContactItem Icon={HomeIcon}>{address}</ContactItem>
                    </Fragment>
                }

            </Stack>
        </AboutContainer>
    )
}
