import { useCallback } from 'react'
import { useProfileDispatch } from '../contexts/ProfileContextHooks'
import { useHistoryDispatch } from '../contexts/HistoryContextHooks'
import statisticsService from '../services/statistics'
import loginService from '../services/login'

const useLoginUser = () => {
    const profileDispatch = useProfileDispatch()
    const historyDispatch = useHistoryDispatch()

    const autoLoginUser = useCallback(async () => {
        const profile = await loginService.getAutoLogin()
        profileDispatch({ type: 'SET_PROFILE', payload: profile })
    }, [profileDispatch])

    const loginUser = useCallback(async (user) => {
        try {
            const profile = await loginService.getInfo(user.access_token)
            profileDispatch({ type: 'SET_PROFILE', payload: profile })

            await loginService.login(profile)
            
            const history = await statisticsService.getHistory()
            historyDispatch({ type: 'SET_USER_HISTORY', payload: history })

            const userStatistics = await statisticsService.getUserStatistics()
            profileDispatch({ type: 'SET_STATISTICS', payload: userStatistics })
        } catch(error) {
            console.log('(useLoginUser.js) Error retrieving user information', error)
        }
    }, [historyDispatch, profileDispatch])

    const logoutUser = useCallback(async () => {
        try {
            await loginService.logout()
            profileDispatch({ type: 'SET_PROFILE', payload: null })
            historyDispatch({ type: 'EMPTY_USER_HISTORY' })
        } catch(error) {
            console.log('(useLoginUser.js) Error logging out:', error)
        }
    }, [historyDispatch, profileDispatch])

    return [autoLoginUser, loginUser, logoutUser]
}

export default useLoginUser