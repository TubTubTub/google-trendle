import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/trends`

const submit = async (dataURL, timeframe) => {
    const body = {
        'dataURL': dataURL,
        'timeframe': timeframe,
    }
    // const result = await axios.post(baseURL, body)
    // return result
    
    /* TEMP RESULTS */
    return {
        data: {
            score: 69,
            globalAverage: 30,
            globalAttempts: 20
        }
    }
}

const getYAxisLabels = async (word, forceNew) => {
    /* TEMP RESULTS */
    const storedLabels = sessionStorage.getItem('Y_AXIS_LABELS')

    if (storedLabels && !forceNew) {
        return JSON.parse(storedLabels)
    }
    else {
        const newLabels = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
        sessionStorage.setItem('Y_AXIS_LABELS', JSON.stringify(newLabels))
        return newLabels
    }
}

export default { submit, getYAxisLabels }