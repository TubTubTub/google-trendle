import { useEffect } from 'react'
import { Button } from '@mantine/core'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { PiUserCircleThin } from 'react-icons/pi'

import UserAvatar from './UserAvatar'

import { useProfileValue } from '../../contexts/ProfileContextHooks'
import useLoginUser from '../../hooks/useLoginUser'

const Login = () => {
    const [autoLoginUser, loginUser, logoutUser] = useLoginUser()
    const { profile } = useProfileValue()

    useEffect(() => {
        autoLoginUser()
    }, [autoLoginUser])

    const login = useGoogleLogin({
        onSuccess: (user) => loginUser(user),
        onError: (error) => console.error(`(Login.jsx) Login failed: ${error}`),
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