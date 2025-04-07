import axios from 'axios'

import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/trends`

const submit = async (word, dataURL, timeframe, userId) => {
    const body = {
        'word': word,
        'dataURL': dataURL,
        'timeframe': timeframe,
        'userId': userId
    }

    const result = await axios.post(`${baseURL}/submit`, body, {
        withCredentials: true,
        timeout: 40000
    })

    return result.data
}

export default { submit }