import { Avatar, Divider, Stack, Typography, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import React, { Fragment } from 'react'

export default function MenuItem({ user }) {
    const theme = useTheme()

    return (
        <Stack direction='row' gap={2} sx={{backgroundColor: 'rgba(100, 100, 100, 0.12)', borderRadius: '10px', height: '60px', justifyContent: 'center', alignItems: 'center', p: 1, cursor: 'pointer', '&:hover': { backgroundColor: chroma(theme.palette.text.primary).alpha(0.15).hex() } }}>
            <Avatar
                alt={user.first_name}
                src={user.images[0]}
                sx={{ width: 56, height: 56 }}
            />
            <Stack sx={{ flexGrow: 1, height: '100%' }}>
                <Stack direction='row' sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                    <Stack sx={{ justifyContent: 'space-evenly' }}>
                        <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                            {`${user.first_name} ${user.last_name}, ${user.age}`}
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', opacity: 0.8 }}>
                            hello
                        </Typography>
                    </Stack>
                    <Stack sx={{ justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                        <Typography sx={{ fontSize: '0.9rem', opacity: 0.6 }}>
                            18:30
                        </Typography>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', backgroundImage: 'var(--text-gradient)', borderRadius: '50%', width: '1.4rem', height: '1.4rem', textAlign: 'center' }}>
                            2
                        </Typography>
                    </Stack>
                </Stack>
                {/* <Divider /> */}
            </Stack>
        </Stack>

    )
}
