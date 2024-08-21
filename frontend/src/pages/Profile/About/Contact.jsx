import React, { Fragment, useContext } from 'react'
import AboutContainer from './components/AboutContainer'
import { Grid, Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import useUpdateProfile from './hooks/useProfileUpdate';
import { ProfileContext } from '../../../context/ProfileProvider';
import axios from '../../../services/axiosinstance'
import EditContainer from './components/EditContaioner';
import InputField from '../../../UI/InputField';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { contactSchema } from '../../../schemas/userSchema';
import ValueCard from '../../../components/ValueCard';
import { colors } from '../../../data/constants';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { filterProfileValue } from '../utils';

function EditModal({ onSubmit, ...props }) {

    const { profile } = useContext(ProfileContext)

    const { formikState, handleSubmit, isSubmitting } = useUpdateProfile({
        initialValues: profile.contact,
        validationSchema: contactSchema,
        onSubmit: props.onClose,
        mutationFn: (data) => axios.patch('/user/contact', data),
    })

    const inputArray = [
        { label: 'Phone Number', type: 'tel' },
        { label: 'Alternate Phone Number', type: 'tel' },
        { label: 'Address' },
        { label: 'Instagram' },
        { label: 'Facebook' },
        { label: 'Linkedin' },
    ]

    return (
        <EditContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} {...props}>
            <Grid className='hide-scroll-bar' container overflow={'auto'}>
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

function ContactItem({ Icon, children }) {
    if (!children) return
    return (
        <Stack direction='row' gap={2} alignItems={'center'}>
            <Icon sx={{ fontSize: 24, color: 'text.primary' }} />
            <Typography textOverflow={'ellipsis'} fontSize={'1rem'} fontFamily={'Lexend,sans-serif'}>{children}</Typography>
        </Stack>
    )
}

function HideContact() {
    return (
        <Stack gap={2} pt={1} direction='row' alignItems={'center'} justifyContent={'center'}>
            <VisibilityOffIcon sx={{ fontSize: '3rem', opacity: '0.6', color: 'text.primary' }} />
            <Typography sx={{ fontSize: '1.5rem', opacity: '0.6', fontFamily: 'Lexend,sans-serif' }}>
                Hidden
            </Typography>
        </Stack>
    )
}

function formatSocialId(url) {
    if (!url) return url
    const arr = url.split('.com/')
    return arr[arr.length - 1].split('/')[0]
}

function getUsernameFromUrl(url, value) {
    if (!url) return
    const urlParts = url.split('/');
    const platformIndex = urlParts.findIndex(part => part.endsWith(value));
    if (platformIndex !== -1 && platformIndex + 1 < urlParts.length) {
        return urlParts[platformIndex + 1];
    } else {
        return null; // Handle invalid URL or unexpected format
    }
}

export default function Contact() {

    const { profile, isMe } = useContext(ProfileContext)
    const contact = profile.contact
    const isHidden = contact === 'hidden'

    const { email, phone_number, address, alternate_phone_number, facebook, instagram, linkedin } = contact || {}

    const contactItems = [
        { value: email, Icon: EmailIcon },
        { value: phone_number, Icon: PhoneIcon },
        { value: alternate_phone_number, Icon: PhoneIcon },
        { value: address, Icon: HomeIcon },
        { value: getUsernameFromUrl(instagram, 'instagram.com'), Icon: InstagramIcon, to: instagram },
        { value: getUsernameFromUrl(facebook, 'facebook.com'), Icon: FacebookIcon, to: facebook },
        { value: getUsernameFromUrl(linkedin, 'in'), Icon: LinkedInIcon, to: linkedin },
    ]

    const fields = filterProfileValue(contactItems)

    if (!isMe && fields.length === 0) return


    return (
        <AboutContainer title='Contact' EditModal={EditModal}>
            {isHidden ? <HideContact /> : <Grid container py={2} px={1} rowSpacing={{ xs: 1, md: 2 }} columnSpacing={{ md: 4 }} overflow='hidden'>
                {
                    fields.map((props, index) => {
                        return <Grid item xs={12} md={6}><ValueCard key={props.value} {...props} color={colors[index + 3]} /></Grid>
                    })
                }
            </Grid>}

        </AboutContainer>
    )
}
