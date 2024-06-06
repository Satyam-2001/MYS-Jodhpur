import React, { useState } from 'react'
import { OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel } from '@mui/material'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = (props) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(prop => !prop)
    }

    return (
        <FormControl sx={{ width: '100%', marginTop: '1rem' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{props.label || "Password"}</InputLabel>
            <OutlinedInput
                id="password"
                name="password"
                label="Password"
                {...props}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>)
}

export default PasswordInput