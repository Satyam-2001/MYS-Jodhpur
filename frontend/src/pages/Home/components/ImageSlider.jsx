import { Box, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import './ImageSlider.css'

function ImageSection({ start }) {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
    const imagesLength = isMobile ? 3 : 5
    return (
        <span style={{ display: 'flex', flexDirection: 'row' }}>
            {
                Array.apply(null, { length: imagesLength }).map((_, index) => {
                    return (
                        <Stack
                            key={start + index}
                            direction='row'
                            sx={{
                                height: '100%',
                                width: `${100/imagesLength}%`,
                                padding: '10px',
                                boxSizing: 'border-box',
                                // opacity: 0.5
                            }}>
                            <Box
                                component='img'
                                sx={{
                                    height: '230px',
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    transform: `rotate(${index & 1 ? -2 : 2}deg)`,
                                    transition: 'transform .2s',
                                    '&:hover': {
                                        transform: 'rotate(0deg) scale(1.1)'
                                    }
                                }}
                                src={require(`../../../assets/couples/${start + index + 1}.jpg`)}
                            />
                        </Stack>

                    )
                })
            }
        </span>
    )
}

function ImageSlider({ start = 0 }) {
    return (
        <Box className='marquee'>
            <Stack className='inner-container' direction={'row'} gap={0}>
                <ImageSection start={start} />
                <ImageSection start={start} />
            </Stack>
        </Box>
    )
}

export default ImageSlider