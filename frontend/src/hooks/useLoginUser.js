import { useCallback } from 'react'
import { useProfileDispatch } from '../contexts/ProfileContextHooks'
import { useAddError } from './useAddError'
import statisticsService from '../services/statistics'
import loginService from '../services/login'

const useLoginUser = () => {
    const profileDispatch = useProfileDispatch()
    const addError = useAddError()

    const autoLoginUser = useCallback(async () => {
        const profile = await loginService.getAutoLogin()
        profileDispatch({ type: 'SET_PROFILE', payload: profile })
    }, [profileDispatch])

    const loginUser = useCallback(async (user) => {
        try {
            const profile = await loginService.getInfo(user.access_token)
            await loginService.login(profile)
            
            profileDispatch({ type: 'SET_PROFILE', payload: profile })

            const userStatistics = await statisticsService.getUserStatistics()
            profileDispatch({ type: 'SET_STATISTICS', payload: userStatistics })
        } catch(error) {
            console.log('(useLoginUser.js) Error retrieving user information', error)
            addError(`${error.message}: Failed to log in!`)
        }
    }, [profileDispatch, addError])

    const logoutUser = useCallback(async () => {
        try {
            await loginService.logout()
            profileDispatch({ type: 'SET_PROFILE', payload: null })
        } catch(error) {
            console.log('(useLoginUser.js) Error logging out:', error)
            addError(`${error.message}: Failed to log out!`)
        }
    }, [profileDispatch, addError])

    return [autoLoginUser, loginUser, logoutUser]
}

export default useLoginUser