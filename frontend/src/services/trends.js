import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/trends`

const submit = async (word, dataURL, timeframe) => {
    const body = {
        'word': word,
        'dataURL': dataURL,
        'timeframe': timeframe
    }

    try {
        const result = await axios.post(`${baseURL}/submit`, body, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
            Accept: 'application/json'
        })

        return result.data
    } catch(error) {
        print('(trends.submit) Submit error:', error)
    }
}

const getYAxisLabels = async (word) => {
    /* TEMP RESULTS */
    const newLabels = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
    return newLabels
}

export default { submit, getYAxisLabels }