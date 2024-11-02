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
        name: profile.name
    })
    console.log(body, 'wowowwo', typeof body)
    const result = await axios.post(`${baseURL}/login`, body, {
        headers: { 'Content-Type': 'application/json' },
        Accept: 'application/json'
    })
    return result.data
}

const logout = async (profile) => {
    const body = JSON.stringify({
        userId: profile.id,
        name: profile.name
    })
    const result = await axios.post(`${baseURL}/logout`, body)
    return result.data
}

export default { getInfo, login, logout }