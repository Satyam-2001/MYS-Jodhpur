import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import CustomModal from "../../../../UI/CustomModal";
import { ElevatedButton } from "../../../../UI/ElevatedComponents";

export default function EditContainer({ children, onSubmit, isSubmitting = false, ...props }) {

    return (
        <CustomModal {...props} sx={{ p: { xs: 2, md: 4 } }} >
            <Stack gap={2} alignItems={'center'} overflow={'hidden'}>
                <Typography variant='h3' fontSize={'1.5rem'} fontWeight={600} sx={{ opacity: 0.8 }}>
                    {props.title}
                </Typography>
                {children}
                <Stack direction='row' gap={1} width='100%'>
                    <ElevatedButton elevation={-1} fullWidth onClick={props.onClose}>
                        Cancel
                    </ElevatedButton>
                    <ElevatedButton fullWidth variant={'contained'} onClick={onSubmit} disabled={isSubmitting} sx={{ bgcolor: 'primary.main' }} >
                        {isSubmitting ? 'Updating...' : 'Save'}
                    </ElevatedButton>
                </Stack>
            </Stack>
        </CustomModal>
    )
}