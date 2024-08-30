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
            xs: '0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 4px 4px 8px -5px rgba(255,255,255,0.06), 3px 3px 8px -5px rgba(0, 0, 0, 0.45)',
            md: '0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 5px 5px 11px -5px rgba(255,255,255,0.06), 4px 4px 8px -5px rgba(0, 0, 0, 0.7)'
        }
    }
    return {
        xs: `inset -6px -6px 14px -5px rgba(255,255,255,0.06), inset ${2 * -value}px ${4 * -value}px ${8 * -value}px -5px rgba(0, 0, 0, ${0.35 * -value})`,
        md: 'inset -6px -6px 14px -5px rgba(255,255,255,0.06), inset 4px 4px 8px -5px rgba(0, 0, 0, 0.75)'
    }
}