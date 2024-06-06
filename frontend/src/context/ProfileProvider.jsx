import { createContext, useState } from "react";

export const ProfileContext = createContext({
    profile: {},
    updateProfile: () => { },
})

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({})

    const updateProfile = (newProfile) => {
        setProfile(newProfile)
    }

    const profileValue = {
        profile,
        updateProfile
    }

    return (
        <ProfileContext.Provider value={profileValue}>
            {children}
        </ProfileContext.Provider>
    )
}