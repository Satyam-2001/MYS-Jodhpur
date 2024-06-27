import { Divider, Stack, useTheme } from "@mui/material"
import { Fragment } from "react"

export default function SubContainer({ children, sx, color }) {
    const theme = useTheme()
    return (
        <Fragment>
            <Stack gap={4} sx={{ px: 4, py: 8, backgroundColor: color === 'secondary' && theme.palette.grey.A100, ...sx }}>
                {children}
            </Stack>
            <Divider />
        </ Fragment>
    )
}