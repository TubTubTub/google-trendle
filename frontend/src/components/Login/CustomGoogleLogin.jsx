import { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useProfileDispatch } from '../../contexts/ProfileContextHooks'

const CustomGoogleLogin = () => {
    const [user, setUser] = useState(null)
    const profileDispatch = useProfileDispatch()

    useEffect(() => {
        if (user) {
            const decodedProfile = jwtDecode(user.credential)
            profileDispatch({ type: 'SET_PROFILE', payload: decodedProfile })
        }
    }, [user, profileDispatch])

    return (
        <GoogleLogin
            onSuccess={(user) => setUser(user)}
            onError={(error) => console.log(error)}
            type="icon"
            useOneTap={true}
            auto_select={true}
            cancel_on_tap_ouside={true}
         />
    )
}

export default CustomGoogleLogin