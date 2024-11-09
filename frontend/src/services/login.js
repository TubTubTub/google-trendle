import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/users`

const getInfo = async (token) => {
    const result = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })
    return result.data
}

const login = async (profile) => {
    const body = JSON.stringify({
        userId: profile.id,
        name: profile.name,
        picture: profile.picture
    })

    const result = await axios.post(`${baseURL}/login`, body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        Accept: 'application/json'
    })
    return result.data
}

const logout = async () => {
    const result = await axios.post(`${baseURL}/logout`, {}, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        Accept: 'application/json'
    })
    return result.data
}

const getAutoLogin = async () => {
    const result = await axios.get(`${baseURL}/autologin`, {
        withCredentials: true,
    })
    console.log(result.data, 'RETURN AUTO LOGINDATA')
    return result.data
}

export default { getInfo, login, logout, getAutoLogin }