import { Divider, Stack, useTheme } from "@mui/material"
import { Fragment } from "react"

export default function SubContainer({ children, sx, bgcolor }) {
    return (
        <Stack gap={4} sx={{ px: { xs: 1, md: 2 }, py: 6, bgcolor: 'background.default', ...sx }}>
            {children}
        </Stack>
    )
}