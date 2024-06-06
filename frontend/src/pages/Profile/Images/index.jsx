import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ProfileContext } from '../../../context/ProfileProvider'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useImageInput } from '../../../hooks/useImageInput';
import { useMutation } from '@tanstack/react-query';
import { uploadMedia } from '../../../services/uploadMedia';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from '../../../services/axiosinstance'
import { useSelector } from 'react-redux';
import NoData from '../../../components/StatusMessage/NoData';

const style = {
    width: { xs: '100%', sm: '50%', md: '25%' },
    height: '250px',
    p: 1,
}

function ImageBox({ image }) {

    const [isHover, setIsHover] = useState(false)
    const { updateProfile } = useContext(ProfileContext)

    const { mutate: deleteImage } = useMutation({
        mutationFn: () => axios.delete('/user/image', { data: { image } }),
        onSuccess: ({ user }) => {
            updateProfile(user)
        }
    })

    const { mutate: setAsProfile } = useMutation({
        mutationFn: () => axios.post('/user/image/profile', { image }),
        onSuccess: ({ user }) => {
            updateProfile(user)
        }
    })


    return (
        <Grid
            item
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            sx={style}
        >
            <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Stack p={1} height='100%' width='100%' sx={{ backgroundSize: 'cover', backgroundImage: `url(${image})`, alignItems: 'flex-end', justifyContent: 'space-between' }} >
                    {isHover && (
                        <>
                            <IconButton sx={{ color: 'red' }} onClick={deleteImage}>
                                <CloseOutlinedIcon fontSize='large' />
                            </IconButton>
                            <Button variant='contained' fullWidth onClick={setAsProfile}>
                                Set Profile
                            </Button>
                        </>
                    )}
                </Stack>
            </Paper>
        </Grid>
    )
}


export default function Images() {
    const { profile, updateProfile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = user._id === profile._id
    const images = profile.images || []
    const isEmpty = images.length === 0

    const { mutate: uploadImageHnadler, isPending } = useMutation({
        mutationFn: async (files) => {
            try {
                const imageUrl = []
                for (let file of files) {
                    imageUrl.push(encodeURI(await uploadMedia(file)))
                }
                console.log(imageUrl)
                const data = await axios.post('/user/image', { image: imageUrl })
                return data
            }
            catch (e) {
                console.log(e)
            }

        },
        onSuccess: ({ user }) => {
            updateProfile(user)
        }
    })

    const options = {
        multiple: true,
        accept: 'image/*'
    }

    const { onClick, inputProps } = useImageInput({
        options,
        onSelect: uploadImageHnadler
    })

    return (
        <Grid className='hide-scroll-bar' container py={2} px={1} sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
            {isEmpty && !isMe && <NoData />}
            {isMe && <Grid item sx={style}>
                <input style={{ display: 'none' }} {...inputProps} />
                <Paper
                    onClick={(e) => { if (!isPending) { onClick(e) } }}
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column'
                    }}>
                    <CameraAltIcon sx={{ fontSize: '100px' }} />
                    <Typography fontSize='1rem' fontFamily={'Lexend,sans-serif'}>
                        {isPending ? 'Uploading' : 'Add Photo'}
                    </Typography>
                </Paper>
            </Grid>}
            {images.map((image) => {
                return (
                    <ImageBox key={image} image={image} />
                )
            })}
        </Grid>
    )
}
