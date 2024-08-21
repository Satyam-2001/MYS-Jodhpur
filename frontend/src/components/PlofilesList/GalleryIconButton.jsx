import { Badge, IconButton } from '@mui/material'
import React from 'react'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useNavigate } from 'react-router';
import { elevation } from '../../theme/styles';

export default function GalleryIconButton({ profile, sx = {}, ...props }) {
    const navigate = useNavigate()
    const images = profile?.images || []
    const count = images.length

    const clickHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        navigate(`/profile/${profile?._id}/gallery`)
    }

    if (count === 0) return

    return (
        <IconButton onClick={clickHandler} sx={{ boxShadow: elevation() }} {...props}>
            <Badge color='primary' badgeContent={count}>
                <CollectionsIcon sx={{ fontSize: '1.4rem', color: 'text.primary', ...sx }} />
            </Badge>
        </IconButton>
    )
}
