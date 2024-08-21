import { Stack, Typography } from '@mui/material'
import React from 'react'
import { lastSeenDate } from '../utils'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const online_color = '#53DA62'

export default function LastSeen({ user, sx = {} }) {
    if (!user?.status) return
    return (
        <Typography sx={{ opacity: 0.9, color: 'text.primary', fontSize: 14, ...sx }}>
            {user.status === 'online' ? <Stack direction='row' gap={0.5} sx={{ alignItems: 'center' }}><FiberManualRecordIcon sx={{ fontSize: 14, color: online_color }} /> Online</Stack> : `Last seen at ${lastSeenDate(user.last_seen)}`}
        </Typography>
    )
}
