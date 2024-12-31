import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/words`

const getWord = async () => {
    const result = await axios.get(baseURL)
    return result.data
}

export default { getWord }