import { Button, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { elevation } from '../theme/styles';

const createStyledComponent = (Component, { bgcolor = true, sx = {} } = {}) => styled(Component)(({ theme, elevation: up = 0 }) => {
    const isDark = theme.palette.mode === 'dark';
    const boxShadowUp = `0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 6px 6px 14px -5px rgba(255,255,255,0.06), 6px 6px 7px -5px rgba(0, 0, 0, ${isDark ? '0.8' : '0.5'})`;
    const boxShadowDown = 'inset -6px -6px 14px -5px rgba(255,255,255,0.06), inset 6px 6px 14px -5px rgba(0, 0, 0, 0.85)';

    return {
        backgroundColor: bgcolor ? theme.palette.background.paper : undefined,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
            boxShadow: elevation(up).xs,
        },
        [theme.breakpoints.up('md')]: {
            boxShadow: elevation(up).md,
        },
        ...sx,
    };
});

export const ElevatedStack = createStyledComponent(Stack)
export const ElevatedIconButton = createStyledComponent(IconButton, { sx: { borderRadius: '50%' } })
export const ElevatedButton = createStyledComponent(Button, { bgcolor: false })

export default createStyledComponent;
