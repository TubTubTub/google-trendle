import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/words`

const getWord = async (forceNew) => {
    const storedWord = sessionStorage.getItem('WORD')

    if (storedWord && !forceNew) {
        return storedWord
    }
    else {
        const result = await axios.get(baseURL)
        sessionStorage.setItem('WORD', result.data)
        return result.data
    }
}

export default { getWord } 