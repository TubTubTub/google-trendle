import axios from 'axios'

const getInfo = async (token) => {
    const result = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })

    return result.data
}

export default { getInfo }