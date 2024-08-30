import { Stack, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import React from 'react'
import Tilt from 'react-parallax-tilt'
import { ElevatedStack } from './ElevatedComponents'

export default function ColorBlock({ children, sx = {}, style = {} }) {
    const theme = useTheme()
    const mode = theme.palette.mode
    const color = theme.palette.action.hover
    return (
        <Tilt
            tiltEnable={false}
            glareEnable={true}
            scale={1.05}
            glareMaxOpacity={0.3}
            glareColor={mode === 'dark' ? 'white' : chroma(color).darken().hex()}
            glarePosition="all"
            glareBorderRadius="10px"
            style={{ borderRadius: '20px', ...style }}
        >
            <ElevatedStack
                sx={{
                    p: 3,
                    gap: 2,
                    alignItems: 'center',
                    borderRadius: 'inherit',
                    border: 'solid 1px',
                    borderColor: color,
                    height: '100%',
                    justifyContent: 'center',
                    backgroundColor: chroma(color).alpha(0.1).hex(),
                    ...sx
                }}
            >
                {children}
            </ElevatedStack>
        </Tilt>
    )
}
