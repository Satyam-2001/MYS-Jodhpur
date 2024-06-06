import { Stack, Typography } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import React from 'react'

export default function NoData() {
    return (
        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
            <Stack direction='row' gap={2}>
                <SearchOffIcon sx={{fontSize: '6rem', color: 'text.primary', opacity: 0.3}} />
                <Typography fontSize='4rem' fontWeight={500} sx={{ opacity: 0.3, textAlign: 'center' }}>
                    NULL
                </Typography>
            </Stack>
        </Stack>
    )
}
