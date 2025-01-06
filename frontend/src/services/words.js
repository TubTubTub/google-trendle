import axios from 'axios'

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/words`

const getWord = async () => {
    const result = await axios.get(baseURL)
    return result.data
}

export default { getWord }