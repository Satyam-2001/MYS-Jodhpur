import React from 'react'
import Container from './Container'
import { ElevatedStack } from '../../UI/ElevatedComponents'
import { Stack, Typography } from '@mui/material'
import { HeaderStart } from './Header'

export default function SideContainer({ title, children, sx = {}, style = {}, ...props }) {
    const label = title || props.header.title
    const goBack = props.header.goBack
    return (
        <Container {...props}>
            <ElevatedStack flex={1} sx={{ overflow: 'hidden', p: 1, ...sx }}>
                <HeaderStart
                    header={props.header}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        borderBottom: 1,
                        borderColor: 'divider',
                        px: 1,
                    }}
                />
                {/* <Stack
                    sx={{
                        display: { xs: 'none', md: 'inline' },
                        p: 1,
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1.8rem',
                            fontFamily: 'Lexend,sans-serif',
                        }}
                    >
                        {label}
                    </Typography>
                </Stack> */}
                <Stack sx={{ overflow: 'auto', flex: 1, p: { xs: 1, md: 2 }, ...style }}>
                    {children}
                </Stack>
            </ElevatedStack>
        </Container>
    )
}
