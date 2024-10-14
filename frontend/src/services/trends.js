import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/trends`

const submit = async (data_url, timeframe) => {
    const body = {
        'data_url': data_url,
        'timeframe': timeframe,
    }
    // const result = await axios.post(baseURL, body)
    // return result
    
    /* TEMP RESULTS */
    return {
        score: 69,
        globalAverage: 30,
        globalAttempts: 20
    }
}

export default { submit }