import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/rankings`

const getAll = async () => {
    // const result = await axios.get(baseURL)
    return [['Deez nuts', 100], ['Jeremiah', 69], ['Derke', 10]]
}

export default { getAll }