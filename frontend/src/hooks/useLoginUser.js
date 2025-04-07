import { useCallback } from 'react'

import { useAddError } from './useAddError'

import { useProfileDispatch } from '../contexts/ProfileContextHooks'
import statisticsService from '../services/statistics'
import loginService from '../services/login'

const useLoginUser = () => {
    const profileDispatch = useProfileDispatch()
    const addError = useAddError()

    const loginProfile = useCallback(async (profile) => {
        await loginService.login(profile)

        profileDispatch({ type: 'SET_PROFILE', payload: profile })

        const userStatistics = await statisticsService.getUserStatistics(profile.id)
        userStatistics['averageScore'] = Math.round(userStatistics['averageScore'] * 10) / 10
        profileDispatch({ type: 'SET_STATISTICS', payload: userStatistics })
    }, [profileDispatch])

    const autoLoginUser = useCallback(async () => {
        const cachedProfile = await loginService.getAutoLogin()
        if (cachedProfile) {
            await loginProfile(cachedProfile)
        }
    }, [loginProfile])

    const loginUser = useCallback(async (user) => {
        try {
            const profile = await loginService.getInfo(user.access_token)
            await loginProfile(profile)
        } catch(error) {
            console.error(`(useLoginUser.js) Error retrieving user information: ${error}`)
            addError(`Failed to log in: ${error.message}`)
        }
    }, [addError, loginProfile])

    const logoutUser = useCallback(async () => {
        try {
            await loginService.logout()
            profileDispatch({ type: 'SET_PROFILE', payload: null })
            profileDispatch({ type: 'SET_STATISTICS', payload: { averageScore: null, rank: null }})
        } catch(error) {
            console.error(`(useLoginUser.js) Error logging out: ${error}`)
            addError(`Failed to log out: ${error.message}`)
        }
    }, [profileDispatch, addError])

    return [autoLoginUser, loginUser, logoutUser]
}

export default useLoginUser