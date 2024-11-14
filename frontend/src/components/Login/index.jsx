import { useState, useEffect } from 'react'
import { Button } from '@mantine/core'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { PiUserCircleThin } from 'react-icons/pi'

import { useHistoryDispatch } from '../../contexts/HistoryContextHooks'
import { useProfile } from '../../contexts/ProfileContextHooks'
import statisticsService from '../../services/statistics'
import loginService from '../../services/login'
import UserAvatar from './UserAvatar'

const Login = () => {
    const [{ profile }, profileDispatch] = useProfile()
    const [user, setUser] = useState(null)
    const historyDispatch = useHistoryDispatch()

    useEffect(() => {
        loginService.getAutoLogin()
            .then((result) => {
                profileDispatch({ type: 'SET_PROFILE', payload: result })
            })
    }, [profileDispatch])

    useEffect(() => {
        const initialiseUser = async () => {
            const profile = await loginService.getInfo(user.access_token)
            profileDispatch({ type: 'SET_PROFILE', payload: profile})

            await loginService.login(profile)
            
            const history = await statisticsService.getHistory()
            historyDispatch({ type: 'SET_HISTORY', payload: history })
        }

        if (user) {
            try {
                initialiseUser()
            } catch(error) {
                console.log('(Login.jsx) Error retrieving user information', error)
            }
        }
    }, [user, profileDispatch, historyDispatch])

    const login = useGoogleLogin({
        onSuccess: (result) => setUser(result),
        onError: (error) => console.log('(Login.jsx) LOGIN FAILED:', error),
    })

    const logout = () => {
        googleLogout()
        setUser(null)
        loginService.logout()
            .then(() => {
                profileDispatch({ type: 'SET_PROFILE', payload: null })
                historyDispatch({ type: 'EMPTY_HISTORY' })
                console.log('(Login.jsx) Logged out successfully')
            })
    }
 
    return (
        <>
            {profile ? <UserAvatar onLogout={logout} /> : (
                <Button
                    size="md"
                    radius="xl"
                    variant="outline"
                    onClick={login}
                    leftSection={<PiUserCircleThin size="1.75em"/>}
                    style={{ paddingLeft: '0.5em', paddingRight: '0.75em' }}
                >
                    Sign in
                </Button>
            )}
        </>
    )
}

export default Login