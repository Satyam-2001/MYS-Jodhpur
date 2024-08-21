import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import Tilt from 'react-parallax-tilt'
import { defaultImage } from '../../data/constants'
import { elevation } from '../../theme/styles'

export default function MemberCard({ name, designation, image, hideDesignaton }) {
    const theme = useTheme()
    return (
        <Tilt
            scale={1.08}
            tiltEnable={false}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            glareBorderRadius='1rem'
            className='parallax-effect'
            style={{
                maxWidth: '90%',
                borderRadius: '1rem',
                backgroundColor: theme.palette.action.hover,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '0.5rem',
                boxSizing: 'border-box',
                boxShadow: elevation(),
            }}
        >
            <Stack gap={1} sx={{ alignItems: 'center' }}>
                <img src={image || defaultImage} style={{ borderRadius: '1rem', width: '97%' }} />
                <Typography sx={{ fontSize: '1.2rem', fontFamily: 'lexend,sans-serif', textAlign: 'center' }}>{name}</Typography>
                {!hideDesignaton && <Typography sx={{ fontSize: '1rem', fontFamily: 'lexend,sans-serif', textAlign: 'center' }}>{designation}</Typography>}
            </Stack>
        </Tilt>
    )
}