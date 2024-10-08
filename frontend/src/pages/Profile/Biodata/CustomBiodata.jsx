import { Stack, Typography } from '@mui/material'
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { ProfileContext } from '../../../context/ProfileProvider'
import { dateFormat, heightFormat, timeFormat } from '../../../utils'
import { CustomBiodataContext } from './CustomBiodataContext'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from 'axios'
import { elevation } from '../../../theme/styles'
import { filterProfileValue } from '../utils'

function CustomText({ children }) {
    const { color } = useContext(CustomBiodataContext)
    return (
        <Typography fontSize={'0.7em'} color={color} fontWeight={500} fontFamily={'Lexend,sans-serif'}>
            {children}
        </Typography>
    )
}

function IntroField({ label, value }) {
    if (!value) return
    return (
        <Stack direction='row' gap={1} fontSize={'1em'}>
            <Stack direction='row' width='8em' fontSize={'1em'} justifyContent={'space-between'}>
                <CustomText>
                    {label}
                </CustomText>
                <CustomText>
                    :
                </CustomText>
            </Stack>
            <CustomText>
                {value}
            </CustomText>
        </Stack>
    )
}

function DetailBox({ title, children, hide = false, ...props }) {
    const { color } = useContext(CustomBiodataContext)

    if (hide === true) return

    return (
        <Stack gap={2} width='100%' alignItems={'center'} fontSize={'1em'} {...props}>
            <Typography fontWeight={600} fontSize='1em' color={color} fontFamily={'Lexend,sans-serif'}>
                {title}
            </Typography>
            <Stack width='100%' fontSize={'1em'}>
                {children}
            </Stack>
        </Stack>
    )
}

export default forwardRef(function CustomBiodata(props, ref) {
    const { profile, isPending } = useContext(ProfileContext)
    const selectedBiodata = useContext(CustomBiodataContext)
    // const [base64IMG, setBase64IMG] = useState('')
    const imageUrl = profile.basic_info.profile_image

    function containsField(obj) {
        if (!obj || typeof obj !== 'object') return false
        let contain = false
        Object.values(obj).forEach(value => {
            contain |= !!value
        })
        return contain
    }

    if (isPending) return

    const family_details = [
        {
            label: "Father's Name",
            value: profile.family?.father_name
        },
        {
            label: "Father's Occupation",
            value: profile.family?.father_occupation
        },
        {
            label: "Mother's Name",
            value: profile.family?.mother_name
        },
        {
            label: "Mother's Occupation",
            value: profile.family?.mother_occupation
        },
    ]

    const family = filterProfileValue(family_details)

    return (
        <Stack
            ref={ref}
            sx={{
                // maxWidth: '100%',
                width: '600px',
                maxWidth: '600px',

                fontSize: '20px',
                // overflow: 'auto',
                flexShrink: 0,
                aspectRatio: '210/297',
                backgroundImage: `url(${selectedBiodata.image})`,
                backgroundSize: '100% 100%',
                ...selectedBiodata
            }}>
            <Stack
                p={2}
                gap={3}
                sx={{
                    // bgcolor: 'rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    fontSize: '1em',
                }}>
                <DetailBox title={'BIODATA'} >
                    <Stack direction='row' width='100%' fontSize={'1em'}>
                        <Stack gap={'3px'} fontSize={'1em'}>
                            <IntroField label='Name' value={profile.basic_info.name} />
                            <IntroField label='Date of Birth' value={profile.basic_info.date_of_birth ? dateFormat(profile.basic_info.date_of_birth) : null} />
                            <IntroField label='Time of Birth' value={profile.basic_info.time_of_birth ? timeFormat(profile.basic_info.time_of_birth) : null} />
                            <IntroField label='Place of Birth' value={profile.basic_info.place_of_birth} />
                            <IntroField label='Gotra' value={profile.basic_info.gotra_self} />
                            <IntroField label='Manglik' value={profile.basic_info.manglik} />
                            <IntroField label='Height' value={profile.basic_info.height ? heightFormat(profile.basic_info.height) : null} />
                            <IntroField label='Complexion' value={profile.basic_info.color} />
                            <IntroField label='Education' value={profile.basic_info.education} />
                            <IntroField label='Occupation' value={profile.basic_info.occupation} />
                            <IntroField label='Location' value={profile.basic_info.location} />
                            <IntroField label='Income' value={profile.basic_info.income + ' LPA'} />
                        </Stack>
                        {/* <Stack flex={1} p={1}>
                            {profile.basic_info.profile_image && <img
                                src={imageUrl}
                                style={{
                                    aspectRatio: '1/1',
                                    // backgroundImage: `url(${profile.basic_info.profile_image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '50%',
                                    width: '100%',
                                }}
                            />}
                        </Stack> */}
                    </Stack>
                </DetailBox>
                <DetailBox title={'FAMILY DETAILS'} hide={!family.length} >
                    {family.map((props) => <IntroField key={props.label} {...props} />)}
                </DetailBox>
                <DetailBox title={'CONTACT DETAILS'} hide={!containsField(profile.contact)}>
                    <IntroField label="Contact No." value={profile.contact.phone_number} />
                    <IntroField label='Email' value={profile.contact.email} />
                    <IntroField label='Address' value={profile.contact.address} />
                </DetailBox>
            </Stack>
        </Stack>
    )
})
