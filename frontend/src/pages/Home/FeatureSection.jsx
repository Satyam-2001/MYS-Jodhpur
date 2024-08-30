import React from 'react'
import { Divider, Stack, Typography, useTheme } from '@mui/material'
import SubContainer from './components/SubContainer'
import { elevation } from '../../theme/styles'

import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { APPBAR_HEIGHT } from '../../components/Layouts/Header';

const StickyContent = styled(Stack)(({ theme }) => ({
    position: 'sticky',
    [theme.breakpoints.up('md')]: {
        top: `${APPBAR_HEIGHT + 8}px`,
        height: '100vh',
    },
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
}));

const ImageScroller = styled(Box)(({ theme }) => ({
    height: '200vh', // Extend height to create scrolling effect
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
}));

const ImageItem = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(2),
}));

function FeatureImage({ src, align = 'left' }) {
    return (
        <Stack
            component={'img'}
            src={src}
            sx={{
                maxHeight: '64vh',
                boxShadow: elevation(),
                borderRadius: '5px',
                transform: `translateX(${align === 'left' ? -100 : 100}px)`,
                '&:hover': {
                    zIndex: 100,
                }
            }}
        />
    )
}

function FeatureItem({ title, subtitle }) {
    const titleArray = title.split(' ')
    const endTitle = ` ${titleArray.pop()}`
    const startTitle = titleArray.join(' ')
    return (
        <Stack>
            <Typography
                sx={{
                    fontFamily: 'Lexend,sans-serif',
                    fontSize: { xs: '24px', md: '32px' },
                }}
            >
                {startTitle}
                <span class='text-gradient'>{endTitle}</span>
            </Typography>
            <Divider
                sx={{
                    color: 'primary.main',
                    width: '100px',
                    borderWidth: '2px',
                    borderColor: 'primary.main',
                    mb: 1,
                }}
            />
            <Typography
                sx={{ fontSize: '18px' }}
            >
                {subtitle}
            </Typography>
        </Stack>
    )
}

const FeaturesSection = () => {
    const theme = useTheme()
    const mode = theme.palette.mode
    return (
        <Box display="flex" sx={{ bgcolor: 'background.default' }}>
            <StickyContent elevation={3} sx={{ flex: { md: 1 }, width: { xs: '100%', md: '50%' }, pl: { md: 10 } }}>
                <Typography
                    sx={{
                        fontFamily: 'Lexend,sans-serif',
                        fontSize: { xs: '3.6rem', md: '48px' },
                        textAlign: { xs: 'center', md: 'start' },
                        fontWeight: 500,
                    }}
                >
                    Explore The <span class='text-gradient'>Features</span>
                </Typography>
                <Stack sx={{ pt: 2, gap: 2 }}>
                    <FeatureItem title={'Chat With Your Match'} subtitle={'Enjoy secure conversation through are encrypted chats'} />
                    <FeatureItem title={'Filter Your Preference'} subtitle={'Search according to your preference'} />
                    <FeatureItem title={'Connect With Your Match'} subtitle={'Send the request to connect and start your wonderful journey'} />
                </Stack>
            </StickyContent>

            <Box flex={1} sx={{ display: { xs: 'none', md: 'block' }, pt: `${APPBAR_HEIGHT}px` }}>
                <ImageScroller>
                    <FeatureImage align='left' src={(require(`../../assets/features/chat_${mode}.png`))} />
                    <FeatureImage align='right' src={(require(`../../assets/features/profile_${mode}.png`))} />
                    <FeatureImage align='left' src={(require(`../../assets/features/search_${mode}.png`))} />
                </ImageScroller>
            </Box>
        </Box>
    );
};

export default FeaturesSection;


// export default function FeatureSection() {
//     const theme = useTheme()
//     const mode = theme.palette.mode
//     return (
//         <SubContainer>
//             <Stack direction='row' sx={{ position: 'relative', overflow: 'auto', maxHeight: '100vh' }}>
//                 <Stack
//                     sx={{
//                         position: 'sticky',
//                         width: { md: '50%' }
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             fontFamily: 'Lexend,sans-serif',
//                             fontSize: '32px',
//                         }}
//                     >
//                         Explore The Profiles
//                     </Typography>
//                 </Stack>
//                 <Stack
//                     sx={{
//                         flex: 1,
//                         alignItems: 'center',
//                         gap: 1.5,
//                     }}
//                 >
//                     <FeatureImage src={(require(`../../assets/features/chat_${mode}.png`))} />
//                     <FeatureImage src={(require(`../../assets/features/profile_${mode}.png`))} />
//                 </Stack>
//             </Stack>
//         </SubContainer>
//     )
// }
