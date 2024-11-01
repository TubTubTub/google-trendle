import { useState, useEffect } from 'react'
import { Button } from '@mantine/core'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { PiUserCircleThin } from 'react-icons/pi'

import { useProfile } from '../../contexts/ProfileContextHooks'
import UserAvatar from './UserAvatar'
import loginService from '../../services/login'

const Login = () => {
    const [user, setUser] = useState(null)
    const [{ profile }, profileDispatch] = useProfile()

    useEffect(() => {
        if (user) {
            loginService.getInfo(user.access_token)
                .then((result) => {
                    profileDispatch({ type: 'SET_PROFILE', payload: result })
                    loginService.login(result)
                })
                .catch((error) => console.log('Error retrieving user information (Login.jsx)', error))
        }
    }, [user, profileDispatch])

    const login = useGoogleLogin({
        onSuccess: (result) => setUser(result),
        onError: (error) => console.log('LOGIN FAILED (Login.jsx):', error),
    })

    const logout = () => {
        googleLogout()
        setUser(null)
        loginService.logout(profile)
            .then(() => {
                profileDispatch({ type: 'SET_PROFILE', payload: null })
                console.log('logged out successfull (Login.jsx)')
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