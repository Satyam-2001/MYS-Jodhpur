import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import UserCardGridView from '../../components/PlofilesList/UserCardGridView'
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination } from "swiper";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ActivityCards({ data, isPending, field, title }) {
    if (isPending || data?.[field].length == 0) { return }
    return (
        <Stack gap={1} p={1}>
            <Typography sx={{ fontSize: '1.5rem', px: 1, fontFamily: 'Lexend,sans-serif' }}>{title}</Typography>
            <Stack alignItems={'center'}>
                <Carousel showStatus={false} showThumbs={false} showIndicators={false} className='.carousel' >
                    {data[field].map((profile) => (
                        <UserCardGridView key={profile._id} profile={profile} sx={{height: '75vh', width: '100%'}} />
                    ))}
                </Carousel>
            </Stack>
        </Stack>
    )
}
