import axios from 'axios'

import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/words`

const getWord = async () => {
    const body = {}

    const result = await axios.post(`${baseURL}/word`, body, {
        withCredentials: true,
        timeout: 40000
    })

    return result?.data.word
}

export default { getWord }