import { Button, Grid, IconButton, Modal, Paper, Stack, Typography, Popover, CircularProgress } from '@mui/material'
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
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import ImageContainer from './ImageContainer';
import { useNavigate } from 'react-router';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EmptyGallery from '../../../components/StatusMessage/Empty/EmptyGallery';

const style = {
    // width: { xs: '50%', sm: '50%', md: '25%' },
    display: 'flex',
    alignItems: 'stretch',
    p: 1,
}

function ImageBox({ image, onClick }) {

    const [isHover, setIsHover] = useState(false)
    const { updateProfile, profile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = user._id === profile._id

    const { mutate: deleteImage } = useMutation({
        mutationFn: () => axios.delete('/user/image', { data: { image } }),
        onSuccess: async ({ user }) => {
            try {
                await deleteMedia(image)
                updateProfile(user)
            }
            catch (e) {
                console.error(e)
            }
        }
    })

    const { mutate: setAsProfile } = useMutation({
        mutationFn: () => axios.post('/user/image/profile', { image }),
        onSuccess: ({ user }) => {
            updateProfile(user)
        }
    })

    return (
        <ImageContainer
            onClick={onClick}
            sx={{
                backgroundSize: 'cover',
                backgroundImage: `url("${image}")`,
            }}
        />
    )
}

export default function Images() {
    const navigate = useNavigate()
    const { profile, updateProfile } = useContext(ProfileContext)
    const { user } = useSelector(state => state.user)
    const isMe = user._id === profile._id
    const images = profile.images || []
    const isEmpty = images.length === 0
    const [selectedImage, setSelectedImage] = useState(undefined)
    const modalOpen = selectedImage !== undefined
    const noData = isEmpty && !isMe

    function imageSelectHandler(index) {
        navigate(`/profile/${profile._id}/gallery/?image=${index}`)
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
            {noData && <EmptyGallery />}
            {!noData &&
                <Stack direction='row' className='hide-scroll-bar' container py={{ xs: 1, md: 1.5 }} px={0} sx={{ width: '100%', overflow: 'auto', flexWrap: 'wrap' }}>
                    {isMe && images.length <= 10 && <ImageContainer
                        onClick={(e) => { if (!isPending) { onClick(e) } }}
                        sx={{
                            // height: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: isPending && 'GrayText',
                            bgcolor: !isPending && 'primary.light',
                        }}
                    >
                        {isPending ? <CircularProgress color='primary' /> : <AddOutlinedIcon sx={{ fontSize: '80px', color: 'white' }} />}
                        {/* {!isPending && <Typography fontSize='1rem' fontFamily={'Lexend,sans-serif'}>
                            Add Photo
                        </Typography>} */}
                    </ImageContainer>}
                    {images.map((image, index) => {
                        return (
                            <ImageBox key={image} image={image} onClick={() => imageSelectHandler(index)} />
                        )
                    })}
                </Stack>}
        </Fragment >
    )
}
