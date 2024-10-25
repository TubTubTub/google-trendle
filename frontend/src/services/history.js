import axios from 'axios'
import { BACKEND_URL } from '../utils/constants'

const baseURL = `${BACKEND_URL}/api/rankings`

const getAll = async () => {
    // const result = await axios.get(baseURL)
    return [
        {
            'word': 'Banana',
            'score': 40,
            'date': '2012-04-23T18:25:43.511Z'
        },
        {
            'word': 'Apple',
            'score': 10,
            'date': '2015-04-23T18:25:43.511Z'
        },
        {
            'word': 'Satsuma',
            'score': 100,
            'date': '2016-04-23T18:25:43.511Z'
        },
        {
            'word': 'Banana2',
            'score': 40,
            'date': '2012-04-23T18:25:43.511Z'
        },
        {
            'word': 'Apple2',
            'score': 10,
            'date': '2015-04-23T18:25:43.511Z'
        },
        {
            'word': 'Satsuma2',
            'score': 100,
            'date': '2016-04-23T18:25:43.511Z'
        },
        {
            'word': 'Banana3',
            'score': 40,
            'date': '2012-04-23T18:25:43.511Z'
        },
        {
            'word': 'Apple3',
            'score': 10,
            'date': '2015-04-23T18:25:43.511Z'
        },
        {
            'word': 'Satsuma3',
            'score': 100,
            'date': '2016-04-23T18:25:43.511Z'
        },
    ]
}

export default { getAll }