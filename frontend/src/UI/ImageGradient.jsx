import { Stack, styled } from '@mui/material'

const ImageGradient = styled(Stack)(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 'inherit',
    justifyContent: 'flex-end',
    backgroundImage: 'linear-gradient(-180deg, transparent 20%, rgba(0, 0, 0, 0.7) 100%)',
    padding: '8px',
}));

export default ImageGradient

