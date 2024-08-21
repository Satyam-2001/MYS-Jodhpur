import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


export default function SettingCard({ title, Icon, subtitle, to, target }) {
    return (
        <Link to={to} target={target} style={{ textDecoration: 'none' }}>
            <Stack
                direction={'row'}
                sx={{
                    p: { md: 1 },
                    gap: 2,
                    alignItems: 'center',
                    borderRadius: '8px',
                    '&:hover': {
                        bgcolor: 'divider'
                    }
                }}
            >
                <Icon sx={{ fontSize: '2rem', color: 'text.primary' }} />
                <Stack
                    sx={{
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Typography fontSize={'1rem'} fontFamily={'Lexend,sans-serif'}>
                        {title}
                    </Typography>
                    <Typography fontSize={'0.8rem'} fontFamily={'Lexend,sans-serif'}>
                        {subtitle}
                    </Typography>
                </Stack>
                <Stack sx={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
                    <ArrowForwardIosOutlinedIcon sx={{ fontSize: '1.6rem', color: 'text.primary' }} />
                </Stack>
            </Stack>
        </Link>
    )
}