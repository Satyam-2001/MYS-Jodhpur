import { StepConnector, stepConnectorClasses, styled } from "@mui/material";

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                theme.customGradients.mainGradient,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                theme.customGradients.mainGradient,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#bbb',
        borderRadius: 1,
    },
}));

export const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#bbb',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            theme.customGradients.mainGradient,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            theme.customGradients.mainGradient,
    }),
}));

export function ColorlibStepIcon(props) {
    const { active, completed, className, iconImage } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {iconImage}
        </ColorlibStepIconRoot>
    );
}