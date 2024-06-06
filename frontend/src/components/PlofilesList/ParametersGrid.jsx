import React from 'react'
import { getParameters } from '../../data/parameters'
import { Grid, Stack, Typography } from '@mui/material'

function ParameterItem({ Icon, value, color }) {
    return (
        <Grid item xs={6} sx={{ overflow: 'hidden', my: '2px' }}>
            <Stack direction='row' gap={1} sx={{ alignItems: 'center' }}>
                <Icon sx={{ fontSize: '1.4rem', color: color || 'text.primary' }} />
                <Typography sx={{ fontSize: '0.9rem', fontFamily: 'Lexend,sans-serif', color }}>
                    {value}
                </Typography>
            </Stack>
        </Grid>
    )
}

export default function ParametersGrid({ profile, color }) {
    const userInfo = profile.basic_info
    return (
        <Grid container>
            {getParameters(userInfo).map(({ value, Icon }) => {
                return (
                    <ParameterItem key={value} value={value} Icon={Icon} color={color} />
                )
            })}
        </Grid>
    )
}
