import { Button, Grid, IconButton, Modal, Paper, Stack, Typography, Popover } from '@mui/material'
import React, { Fragment, useContext, useState } from 'react'
import { ProfileContext } from '../../../context/ProfileProvider'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useImageInput } from '../../../hooks/useImageInput';
import { useMutation } from '@tanstack/react-query';
import { deleteMedia, uploadMedia } from '../../../services/uploadMedia';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from '../../../services/axiosinstance'
import { useSelector } from 'react-redux';
import NoData from '../../../components/StatusMessage/NoData';
import ImageGallery from "react-image-gallery";
import CloseIcon from '@mui/icons-material/Close';
import NameHeader from '../../../UI/NameHeader'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css'
import { toast } from 'react-toastify';

const style = {
    width: { xs: '100%', sm: '50%', md: '25%' },
    height: '250px',
    p: 1,
}

function ImageBox({ image, onClick }) {

    const [isHover, setIsHover] = useState(false)
    const { updateProfile, profile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = user._id === profile._id

    const { mutate: deleteImage } = useMutation({
        mutationFn: () => axios.delete('/user/image', { data: { image } }),
        onSuccess: ({ user }) => {
            deleteMedia(image)
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
            onClick={onClick}
            sx={style}
        >
            <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Stack p={1} height='100%' width='100%' sx={{ backgroundSize: 'cover', backgroundImage: `url(${image})`, alignItems: 'flex-end', justifyContent: 'space-between' }} />
            </Paper>
        </Grid>
    )
}

const createImageProps = (path) => {
    return {
        original: path,
        thumbnail: path,
        originalHeight: '400px',
        // originalWidth: '1000px',
        // thumbnailHeight: '150px',
        // thumbnailWidth: '300px',
    }
}



function ImageMenu({ image }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { updateProfile, profile } = useContext(ProfileContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const { mutate: deleteImage } = useMutation({
        mutationFn: () => axios.delete('/user/image', { data: { image } }),
        onSuccess: ({ user }) => {
            deleteMedia(image)
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
        <Fragment>
            <IconButton onClick={handleClick} >
                <MoreVertIcon fontSize='large' sx={{ ":hover": { color: 'primary.main' } }} />
            </IconButton>
            <Popover
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper elevation={2}>
                    <Stack gap={'1px'} p={'2px'}>
                        <Button onClick={setAsProfile} sx={{ color: 'text.primary', textTransform: 'none', fontSize: '1rem', fontFamily: 'Lexend,sans-serif' }}>
                            Set As Profile Image
                        </Button>
                        <Button onClick={deleteImage} sx={{ color: 'text.primary', textTransform: 'none', fontSize: '1rem', fontFamily: 'Lexend,sans-serif' }}>
                            Delete Image
                        </Button>
                    </Stack>
                </Paper>
            </Popover>
        </Fragment>
    )
}

function ImageGalleryModal({ selectedImage, onClose, open, setCurrentImage }) {
    const { profile, updateProfile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = user._id === profile._id
    const images = profile.images || []

    console.log(selectedImage)


    return (
        <Modal open={open} sx={{ backgroundColor: 'background.default', }}>
            <Stack height='100vh'>
                <Stack direction='row' alignItems={'center'} justifyContent={'space-between'} sx={{ bgcolor: 'background.paper', height: '70px', p: 1 }}>
                    <Stack direction='row' gap={1}>
                        <IconButton onClick={onClose} >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <NameHeader profile={profile} />
                    </Stack>
                    {isMe && <ImageMenu image={images[selectedImage]} />}
                </Stack>
                <Stack sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
                    < ImageGallery
                        startIndex={selectedImage}
                        items={images.map(createImageProps)}
                        showFullscreenButton={false}
                        lazyLoad={false}
                        onSlide={setCurrentImage}
                    />
                </Stack>
            </Stack>
        </Modal>
    )
}


export default function Images() {
    const { profile, updateProfile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = user._id === profile._id
    const images = profile.images || []
    const isEmpty = images.length === 0
    const [selectedImage, setSelectedImage] = useState(undefined)
    const modalOpen = selectedImage !== undefined

    function imageSelectHandler(index) {
        setSelectedImage(index)
    }

    function modalCloseHandler() {
        setSelectedImage(undefined)
    }

    const { mutate: uploadImageHnadler, isPending } = useMutation({
        mutationFn: async (files) => {
            try {
                const imageUrl = []
                for (let file of files) {
                    imageUrl.push(encodeURI(await uploadMedia(file)))
                }
                const data = await axios.post('/user/image', { image: imageUrl })
                return data
            }
            catch (e) {
                console.log(e)
            }

        },
        onSuccess: ({ user }) => {
            if (user) {
                updateProfile(user)
            }
        }
    })

    const options = {
        multiple: true,
        accept: 'image/*'
    }

    const { onClick, inputProps } = useImageInput({
        options,
        onSelect: (files) => {
            if (files.length + images.length > 10) {
                toast.error(`You can't upload more than 10 images`, { position: 'top-right' })
            }
            else {
                uploadImageHnadler(files)
            }
        }
    })

    return (
        <Fragment>
            <input style={{ display: 'none' }} {...inputProps} />
            <ImageGalleryModal open={modalOpen} selectedImage={selectedImage} onClose={modalCloseHandler} setCurrentImage={(index) => setSelectedImage(index)} />
            <Grid className='hide-scroll-bar' container py={2} px={1} sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
                {isEmpty && !isMe && <NoData />}
                {isMe && <Grid item sx={style}>
                    <Paper
                        onClick={(e) => { if (!isPending) { onClick(e) } }}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column',
                            color: isPending && 'GrayText'
                        }}>
                        <CameraAltIcon sx={{ fontSize: '100px' }} />
                        <Typography fontSize='1rem' fontFamily={'Lexend,sans-serif'}>
                            {isPending ? 'Uploading' : 'Add Photo'}
                        </Typography>
                    </Paper>
                </Grid>}
                {images.map((image, index) => {
                    return (
                        <ImageBox key={image} image={image} onClick={() => imageSelectHandler(index)} />
                    )
                })}
            </Grid>
        </Fragment >
    )
}
