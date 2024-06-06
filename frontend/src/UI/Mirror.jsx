import { Stack, styled } from '@mui/material'

const Mirror = styled(Stack)(({ theme }) => ({
    display: 'flex',
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
    p: 1,
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)'
}));

export default Mirror