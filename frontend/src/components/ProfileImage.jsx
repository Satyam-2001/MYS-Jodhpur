import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { defaultImage } from '../data/constants'
import ImageGradient from '../UI/ImageGradient'

export default function ProfileImage({ profile, gradient = false, children, sx = {}, sx_image = {}, ...props }) {
    if (gradient) {
        children = <ImageGradient sx={sx_image} >{children}</ImageGradient>
    }
    const [currentIndex, setCurrentIndex] = useState(0)
    const profile_image = profile?.basic_info?.profile_image || profile?.images?.[0]
    const image_gallery = [profile_image].concat(
        (profile?.images || []).filter(image => image != profile_image)
    )
    const imageChangeHandler = (event) => {
        setCurrentIndex((prop) => {
            if (prop === image_gallery.length - 1) return 0
            return prop + 1
        })
    }
    return (
        <Stack
            // {...props}
            onClick={imageChangeHandler}
            sx={{
                flexShrink: 0,
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${image_gallery[currentIndex] || defaultImage})`,
                borderRadius: '10px',
                ...sx,
                // boxShadow: 'inset 0px -10px 25px -10px #000',
            }}
        >
            {children}
        </Stack>
    )
}
