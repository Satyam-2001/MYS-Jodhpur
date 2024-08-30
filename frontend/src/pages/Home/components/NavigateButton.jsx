import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

export default function NavigateButton({ children, to }) {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate(to)
    }
    return (
        <Button
            variant='contained'
            sx={{
                fontSize: '20px',
                borderRadius: '10px',
                mt: 3,
                width: '200px',
                textTransform: 'capitalize',
            }}
            onClick={clickHandler}
        >
            {children}
        </Button>
    )
}
