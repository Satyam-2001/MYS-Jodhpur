import { Stack, styled } from '@mui/material'

const Block = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px'
}));

export default Block