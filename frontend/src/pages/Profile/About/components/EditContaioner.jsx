import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import CustomModal from "../../../../UI/CustomModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // minWidth: 450,
    minWidth: { xs: '90%', md: 450 },
    maxWidth: '100%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function EditContainer({ children, onSubmit, isSubmitting = false, ...props }) {

    return (
        <CustomModal {...props} >
            <Stack gap={2} alignItems={'center'} overflow={'hidden'}>
                <Typography variant='h3' fontSize={'1.5rem'} fontWeight={600} sx={{ opacity: 0.8 }}>
                    {props.title}
                </Typography>
                {children}
                <Stack direction='row' gap={1} width='100%'>
                    <Button fullWidth onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button fullWidth variant={'contained'} onClick={onSubmit} disabled={isSubmitting} >
                        {isSubmitting ? 'Updating...' : 'Save'}
                    </Button>
                </Stack>
            </Stack>
        </CustomModal>
    )
}