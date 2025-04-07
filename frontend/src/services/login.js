import axios from 'axios'

import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/users`

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
    const body = {
        userId: profile.id,
        name: profile.name,
        picture: profile.picture
    }

    const result = await axios.post(`${baseURL}/login`, body, {
        withCredentials: true,
        timeout: 20000
    })
    return result.data
}

const logout = async () => {
    const body = {}

    await axios.post(`${baseURL}/logout`, body, {
        withCredentials: true,
        timeout: 20000
    })
}

const getAutoLogin = async () => {
    const result = await axios.get(`${baseURL}/autologin`, {
        withCredentials: true,
        timeout: 40000
    })
    return result.data
}

export default { getInfo, getAutoLogin, login, logout }