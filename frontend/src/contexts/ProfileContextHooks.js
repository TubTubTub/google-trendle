import { useContext } from 'react'

import ProfileContext from './ProfileContext'


export const useProfile = () => {
    const profileAndDispatch = useContext(ProfileContext)
    return profileAndDispatch
}

export const useProfileValue = () => {
    const profileAndDispatch = useContext(ProfileContext)
    return profileAndDispatch[0]
}

export const useProfileDispatch = () => {
    const profileAndDispatch = useContext(ProfileContext)
    return profileAndDispatch[1]
}