import axios from 'axios'

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/users`

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
    console.log(`${baseURL}/autologin`, 'nig')
    console.log(baseURL, 'CLMON')
    console.log('cheez')
    const result = await axios.get(`${baseURL}/autologin`, {
        withCredentials: true,
    })

    return result.data
}

export default { getInfo, login, logout, getAutoLogin }