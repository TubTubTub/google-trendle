import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/statistics`
const PAGE_SIZE = 30

const getHistory = async () => {
    const result = await axios.get(`${baseURL}/history`, {
        withCredentials: true
    })

    return result.data
}

const getRankings = async (page) => {
    const result = await axios.get(`${baseURL}/rankings?page=${page}&page_size=${PAGE_SIZE}`, {
        withCredentials: true
    })

    return result.data
}

const getUserStatistics = async () => {
    const result = await axios.get(`${baseURL}/user`, {
        withCredentials: true
    })

    return result.data
}

export default { getHistory, getRankings, getUserStatistics }