import React from 'react'
import trust_img from '../../assets/trust.png'
import { Button, Stack, Typography } from '@mui/material'
import { elevation } from '../../theme/styles'
import { useNavigate } from 'react-router'
import NavigateButton from './components/NavigateButton'

export default function SafetySection() {

    return (
        <Stack
            sx={{
                width: '100%',
                height: '400px',
                px: { xs: 1, md: 2 },
                pt: 2,
                pb: 7,
                bgcolor: 'background.default'
            }}
        >
            <Stack
                direction={{ md: 'row' }}
                sx={{
                    borderRadius: '40px',
                    bgcolor: 'action.hover',
                    height: '100%',
                    px: { xs: 3, md: 5 },
                    py: { xs: 3, md: 2 },
                    gap: 20,
                    boxShadow: elevation(0.6),
                }}
            >
                <Stack gap={1} sx={{ alignItems: 'felx-start', justifyContent: 'flex-start' }}>
                    <Typography
                        sx={{
                            fontFamily: 'Lexend,sans-serif',
                            fontSize: '32px',
                        }}
                    >
                        Data Privacy & Safety
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Lexend,sans-serif',
                            fontSize: '16px',
                        }}
                    >
                        We provide a safe environment for users to explore and connect. No information will be shared without your permission, under any circumstances.
                    </Typography>
                    <NavigateButton
                        to={'/privacypolicy'}
                    >
                        See More Details
                    </NavigateButton>
                </Stack>
                <Stack
                    component={'img'}
                    src={trust_img}
                    sx={{
                        height: '250px',
                        display: { xs: 'none', md: 'flex' }
                    }}
                />
            </Stack>
        </Stack >
    )
}
