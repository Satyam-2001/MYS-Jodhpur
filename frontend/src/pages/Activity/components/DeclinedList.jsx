import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import ProfilesList from '../../../components/PlofilesList'
import { useQuery } from '@tanstack/react-query'
import axios from '../../../services/axiosinstance'
import { Stack } from '@mui/material'
import { userActions } from '../../../store/UserSlice'

export default function DeclinedList({ url }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: profileList, isPending } = useQuery({
        queryKey: ['users', url],
        queryFn: ({ signal }) => axios.get(`/activity/${url}`, { signal }),
    })

    useEffect(() => {
        if (isPending) return;
        dispatch(userActions.setActivity({ field: url, data: profileList.map((data) => ({ ...data, user: data.user._id })) }))
    }, [profileList, isPending])

    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <ProfilesList profilesList={profileList?.map(data => data.user) || []} isPending={isPending} />
        </Stack>
    )
}
