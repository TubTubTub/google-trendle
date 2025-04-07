import axios from 'axios'

import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/statistics`

const getUserStatistics = async (userId) => {
    const body = { 'userId': userId }

    const result = await axios.post(`${baseURL}/user`, body, {
        withCredentials: true,
        timeout: 20000
    })

    return result.data
}

const getHistory = async (page, games_per_page, userId) => {
    const body = { 'userId': userId }

    const result = await axios.post(`${baseURL}/history?page=${page}&page_size=${games_per_page}`, body, {
        withCredentials: true,
        timeout: 20000
    })

    return result.data
}

const getRankings = async (page, ranks_per_page) => {
    const body = {}

    const result = await axios.post(`${baseURL}/rankings?page=${page}&page_size=${ranks_per_page}`, body, {
        withCredentials: true,
        timeout: 40000
    })

    return result.data
}

export default { getUserStatistics, getHistory, getRankings }