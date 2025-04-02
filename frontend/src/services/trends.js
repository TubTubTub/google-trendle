import axios from 'axios'

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/trends`

const submit = async (word, dataURL, timeframe) => {
    const body = {
        'word': word,
        'dataURL': dataURL,
        'timeframe': timeframe
    }

    const result = await axios.post(`${baseURL}/submit`, body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        Accept: 'application/json'
    })

    // return {
    //     score: 3,
    //     globalAverage: 32,
    //     globalAttempts: 12,
    //     rawData: [{ "date": 0, "value": 0}, { "date": 1, "value": 10}, { "date": 2, "value": 30}, { "date": 3, "value": 10}, { "date": 4, "value": 50}, { "date": 5, "value": 100}]
    // }

    return result.data
}

const getYAxisLabels = async (word) => {
    /* TEMP RESULTS */
    const newLabels = [66, 33]
    return newLabels
}

export default { submit, getYAxisLabels }