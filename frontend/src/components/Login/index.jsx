import { useEffect } from 'react'
import { Button } from '@mantine/core'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { PiUserCircleThin } from 'react-icons/pi'

import { useProfileValue } from '../../contexts/ProfileContextHooks'
import useLoginUser from '../../hooks/useLoginUser'
import UserAvatar from './UserAvatar'

const Login = () => {
    const [autoLoginUser, loginUser, logoutUser] = useLoginUser()
    const { profile } = useProfileValue()

    useEffect(() => {
        autoLoginUser()
    }, [autoLoginUser])

    const login = useGoogleLogin({
        onSuccess: (user) => loginUser(user),
        onError: (error) => console.log('(Login.jsx) LOGIN FAILED:', error),
    })

    const logout = () => {
        googleLogout()
        logoutUser()
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