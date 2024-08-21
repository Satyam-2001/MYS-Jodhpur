import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function BrowseSection() {
  return (
    <>
      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant='h1' fontWeight={600} sx={{ fontSize: '1.5rem', opacity: 0.8 }}>
          Browse
        </Typography>
        <Typography variant='h1' fontWeight={600} sx={{ fontSize: '3.6rem', textAlign: 'center' }} m={0}>
          <span class="text-gradient">Matrimonial </span>
          Profiles By
        </Typography>
      </Stack>
    </>
  )
}
