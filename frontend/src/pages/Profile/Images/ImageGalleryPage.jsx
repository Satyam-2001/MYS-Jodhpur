import { Button, Grid, IconButton, Modal, Paper, Stack, Typography, Popover, CircularProgress, styled, MenuItem, Menu } from '@mui/material'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css'
import { toast } from 'react-toastify';
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import ImageContainer from './ImageContainer';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { APPBAR_HEIGHT } from '../../../components/Layouts/Header';

const GalleryMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: '4px 8px',
    borderRadius: 0,
    fontSize: '1rem',
    color: theme.palette.text.primary,
}))

function ImageMenu({ image }) {
    const { updateProfile, profile } = useContext(ProfileContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <IconButton
                id="gallery-button"
                aria-controls={open ? 'gallery-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon fontSize='large' sx={{ ":hover": { color: 'primary.main' } }} />
            </IconButton>
            <Menu
                id="gallery-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'gallery-button',
                }}
            >
                <GalleryMenuItem onClick={setAsProfile}>
                    Set As Profile Image
                </GalleryMenuItem>
                <GalleryMenuItem onClick={deleteImage}>
                    Delete Image
                </GalleryMenuItem>
            </Menu>
        </Fragment>
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


export default function ImageGalleryPage(props) {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const { isMe, profile, isPending } = useContext(ProfileContext)
    const images = profile.images || []
    let index = +searchParams.get('image') || 0
    index = index >= images.length ? 0 : index

    const [imageIndex, setImageIndex] = useState(index)

    const { open = true } = props

    const closeHandler = () => {
        navigate(-1)
    }

    return (
        <Modal open={open} sx={{ backgroundColor: 'background.default', }}>
            <Stack height='100vh'>
                <Stack direction='row' alignItems={'center'} justifyContent={'space-between'} sx={{ bgcolor: 'background.default', height: APPBAR_HEIGHT, }}>
                    <Stack direction='row' gap={1} alignItems={'center'}>
                        <IconButton onClick={closeHandler} >
                            <ArrowBackIcon sx={{ fontSize: '1.4rem', color: 'text.primary' }} />
                        </IconButton>
                        <NameHeader isPending={isPending} profile={profile} color='text.primary' hideActivityStatus hideShortlistIcon />
                    </Stack>
                    {isMe && <ImageMenu image={images[imageIndex]} />}
                </Stack>
                <Stack sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
                    < ImageGallery
                        startIndex={imageIndex}
                        items={images.map(createImageProps)}
                        showFullscreenButton={false}
                        lazyLoad={false}
                        onSlide={setImageIndex}
                    />
                </Stack>
            </Stack>
        </Modal>
    )
}