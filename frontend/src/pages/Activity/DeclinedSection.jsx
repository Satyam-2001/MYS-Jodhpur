import { Grid, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { elevation } from '../../theme/styles';

function DeclinedCardItem({ title, subtitle, to, sx = {} }) {
    return (
        <Grid item xs={12} md={6}
            sx={{
                '&:hover': {
                    transform: 'sclae(1.05)',
                },
                ...sx
            }}>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <Stack direction='row'
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        // bgcolor: 'action.hover',
                        px: { xs: 1, md: 2 },
                        py: 1,
                        borderRadius: '10px',
                        boxShadow: elevation(),
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }

                    }}>
                    <Stack sx={{ gap: { xs: 0.5, md: 0.5 } }}>
                        <Typography sx={{ fontSize: '1.2rem', fontFamily: 'sans-serif' }}>
                            {title}
                        </Typography>
                        <Typography>
                            {subtitle}
                        </Typography>
                    </Stack>
                    <IconButton size='large'>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>
            </Link>
        </Grid>
    )
}

export default function DeclinedSection() {
    return (
        <Grid container spacing={{ xs: 1.5, md: 4 }} sx={{ px: { md: 4 }, py: 1 }}>
            <DeclinedCardItem
                title={'Declined Interests'}
                subtitle={'These include interests declined/unmatch by you & others.'}
                to={'/activity/declined'}
                sx={{ display: { md: 'none' } }}
            />
            <DeclinedCardItem
                title={'Interests Declined By You'}
                subtitle={'These include interests declined/unmatch by you.'}
                to={'/activity/declined?q=you'}
                sx={{ display: { xs: 'none', md: 'grid' } }}
            />
            <DeclinedCardItem
                title={'Interests Declined By Others'}
                subtitle={'These include interests declined/unmatch by others.'}
                to={'/activity/declined?q=they'}
                sx={{ display: { xs: 'none', md: 'grid' } }}
            />
        </Grid>
    )
}
