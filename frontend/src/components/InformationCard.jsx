import React from 'react'
import RadialEffect from '../UI/RadialEffect'
import { Typography, styled } from '@mui/material'
import { ElevatedStack } from '../UI/ElevatedComponents'

const CustomText = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontFamily: 'Lexend,sans-serif',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    fontWeight: 350,
}))

function InformationCard(props) {
    const { label, value, color, defaultValue = '-' } = props
    return (
        <ElevatedStack
            direction='row'
            justifyContent={'space-between'}
            sx={{
                p: 0.8,
                width: '100%',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '50px',
                alignItems: 'center',
                '&:hover': {
                    transform: 'scale(1.06)'
                },
            }}>
            <RadialEffect color={color} left={-10} />
            <CustomText sx={{ width: '50%' }}>
                {label}
            </CustomText>
            <ElevatedStack
                elevation={-1}
                px={1}
                py={0.5}
                sx={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <CustomText>
                    {value || defaultValue}
                </CustomText>
            </ElevatedStack>
        </ElevatedStack>
    )
}

export default InformationCard