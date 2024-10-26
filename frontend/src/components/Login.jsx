import { useState, useEffect } from 'react'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Button, Avatar, Tooltip, Menu } from '@mantine/core'
import { TbLogout2 } from 'react-icons/tb'
import { PiUserCircleThin } from 'react-icons/pi'
import loginService from '../services/login'

const Login = ({ size="md" }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    const login = useGoogleLogin({
        onSuccess: (result) => setUser(result),
        onError: (error) => console.log('LOGIN FAILED (Login.jsx):', error)
    })

    const logout = () => {
        googleLogout()
        setProfile(null)
        setUser(null)
    }

    useEffect(() => {
        if (user) {
            loginService.getInfo(user.access_token)
                .then((profile) => setProfile(profile))
                .catch((error) => console.log('Error retrieving user information (Login.jsx)', error))
        }
    }, [user])

    return (
        <>
            {profile ? (
                <Menu>
                    <Menu.Target>
                        <Button variant="transparent" size={size} p={0}>
                            <Avatar size={size} src={profile.picture} name={profile.name} color="initials" alt={`${profile.name}'s user image`} />
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>{`Logged in as ${profile.name}`}</Menu.Label>
                        <Menu.Item
                            color="red"
                            leftSection={<TbLogout2 />}
                            component="button"
                            onClick={logout}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            ) : (
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