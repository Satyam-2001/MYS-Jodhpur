import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query'
import axios from '../services/axiosinstance'
import { queryClient } from "../services/http";

export const ProfileContext = createContext({
    isPending: true,
    profile: {},
    updateProfile: () => { },
})

export const ProfileProvider = ({ children }) => {
    const params = useParams()
    const { user } = useSelector(state => state.user)
    const profileId = params.profileId || user?._id
    const isMe = user?._id === profileId
    const queryKey = ['users', profileId]
    const { data: profile, isPending } = useQuery({
        queryKey,
        queryFn: ({ signal }) => axios.get(`/user/${profileId}`, { signal }),
        enabled: Boolean(profileId)
    })

    const updateProfile = (newProfile) => {
        queryClient.setQueryData(queryKey, newProfile)
    }

    const profileValue = {
        isMe,
        profile: profile || {},
        updateProfile,
        isPending
    }

    return (
        <ProfileContext.Provider value={profileValue}>
            {children}
        </ProfileContext.Provider>
    )
}