import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/statistics`

const getHistory = async () => {
    const result = await axios.get(`${baseURL}/history`, {
        withCredentials: true
    })
    return result.data
}

export default { getHistory }