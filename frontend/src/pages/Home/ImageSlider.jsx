import { Box, Stack } from '@mui/material'
import React from 'react'
import './ImageSlider.css'

function ImageSection({ start }) {
    return (
        <span style={{ display: 'flex', flexDirection: 'row' }}>
            {
                Array.apply(null, { length: 5 }).map((_, index) => {
                    return (
                        <Stack
                            key={start + index}
                            direction='row'
                            sx={{
                                height: '100%',
                                width: '20%',
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
                                src={require(`../../assets/couples/${start + index + 1}.jpg`)}
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