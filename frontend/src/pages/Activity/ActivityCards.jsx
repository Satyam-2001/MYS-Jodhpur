import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import UserCardGridView, { UserCardGridViewSkeleton } from '../../components/PlofilesList/UserCardGridView'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axiosinstance'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ElevatedIconButton } from '../../UI/ElevatedComponents';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

function ActivityCardView({ profileId }) {
    const { data: profile, isPending } = useQuery({
        queryKey: ['users', profileId],
        queryFn: ({ signal }) => axios.get(`/user/${profileId}`, { signal, params: { select: 'basic_info images status last_seen' } }),

    })

    if (isPending || !profile || !profile?.basic_info) {
        return <UserCardGridViewSkeleton sx={{ height: '100%', width: '100%' }} />
    }
    return <UserCardGridView profile={profile} sx={{ height: '100%', width: '100%' }} />
}

function Carousel({ list }) {
    const theme = useTheme()

    return (
        <Stack sx={{ width: '100%', height: '75vh', position: 'relative', alignItems: 'center' }}>
            <style jsx>{`
        .swiper-pagination-bullet-active {
          background: ${theme.palette.primary.main};
          opacity: 1;
        }
      `}</style>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                style={{ height: '100%', maxWidth: '100%' }}
            >
                {list.map((item, i) => (
                    <SwiperSlide
                        key={i}
                        className="event-slide"
                    >
                        <ActivityCardView profileId={list[i]} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* {(itemIndex > 0) && (
                <ElevatedIconButton onClick={backWardHandler} sx={{ position: 'absolute', bgcolor: 'primary.main', borderRadius: '50%', left: { xs: '5%', md: '10%' }, top: '50%', translate: '-50% -50%' }}>
                    <ArrowForwardIosIcon fontSize='large' sx={{ color: 'white', transform: 'rotate(180deg)', '&:hover': { color: 'text.primary' } }} />
                </ElevatedIconButton>)
            }
            <ActivityCardView profileId={list[itemIndex]} />
            {(itemIndex < list.length - 1) && (
                <ElevatedIconButton onClick={forwardHandler} sx={{ position: 'absolute', bgcolor: 'primary.main', borderRadius: '50%', right: { xs: '5%', md: '10%' }, top: '50%', translate: '50% -50%' }}>
                    <ArrowForwardIosIcon fontSize='large' sx={{ color: 'white', '&:hover': { color: 'text.primary' } }} />
                </ElevatedIconButton>)
            } */}
        </Stack>
    )
}

export default function ActivityCards({ isPending, field, label }) {
    const { user } = useSelector(state => state.user)
    const profileList = user?.[field]?.map(data => data.user)
    if (isPending || !profileList?.length) { return }
    return (
        <Stack gap={1} p={1} sx={{ bgcolor: 'transparent' }}>
            <Typography sx={{ fontSize: '1.5rem', px: 1, fontFamily: 'Lexend,sans-serif' }}>{label}</Typography>
            <Carousel list={profileList} />
        </Stack>
    )
}
