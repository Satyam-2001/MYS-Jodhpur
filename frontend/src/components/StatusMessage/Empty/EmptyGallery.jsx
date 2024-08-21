import React from 'react'
import EmptyContainer, { EmptyCard } from './EmptyContainer'
import { Avatar, Stack } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';

function GalleryCard({ sx = {} }) {
  return (
    <EmptyCard
      sx={{
        aspectRatio: '5/5',
        ...sx,
      }}
    >
      <Stack sx={{ height: '100%', width: '100%', bgcolor: 'primary.light', borderRadius: 'inherit', opacity: 0.8 }}>
        <LandscapeOutlinedIcon sx={{ width: '100%', height: '100%', bgcolor: 'transparent', color: 'primary.main' }} />
        {/* <Avatar sx={{ width: '100%', height: '100%', bgcolor: 'transparent', color: theme.palette.primary.main }} /> */}
      </Stack>
    </EmptyCard>
  )
}

export default function EmptyGallery() {
  return <EmptyContainer value={'No Images'} Component={GalleryCard} />
}
