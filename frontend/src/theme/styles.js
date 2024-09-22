import { Typography, styled } from "@mui/material"

export const SECONDARY_FONT_FAMILY = ["'Exo 2'", "sans-serif"].join(",")

export const Heading = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: '1.4rem',
        opacity: 0.8,
        fontFamily: SECONDARY_FONT_FAMILY,
        fontWeight: 500,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.8rem',
        fontFamily: 'Lexend,sans-serif',
    },
}))

export function elevation(value = 0) {
    if (value >= 0) {
        return {
            xs: '0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 3px 3px 6px -4px rgba(255,255,255,0.04), 3px 3px 6px -4px rgba(0, 0, 0, 0.3)',
            md: '0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 3px 3px 6px -4px rgba(255,255,255,0.04), 3px 3px 6px -4px rgba(0, 0, 0, 0.3)'
        }
    }
    return {
        xs: 'inset -4px -4px 10px -4px rgba(255,255,255,0.04), inset 3px 3px 6px -4px rgba(0, 0, 0, 0.25)',
        md: 'inset -4px -4px 10px -4px rgba(255,255,255,0.04), inset 3px 3px 6px -4px rgba(0, 0, 0, 0.3)'
    }
}