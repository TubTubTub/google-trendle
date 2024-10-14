import { createContext, useReducer, useEffect } from 'react'
import wordsService from '../services/words'

const trendsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TIMEFRAME_SIZE':
            return {
                ...state,
                timeframe: state.timeframe.substring(0, state.timeframe.length - 1) + action.payload
            }
        case 'SET_TIMEFRAME_VALUE':
            console.log(action.payload)
            console.log('setting', state.timeframe.replace(/[0-9]+/, action.payload))
            return {
                ...state,
                timeframe: state.timeframe.replace(/[0-9]+/, action.payload)
            }
        case 'SET_DATA_URL':
            return {
                ...state,
                data_url: action.payload
            }
        case 'SET_RESULT':
            return {
                ...state,
                result: action.payload
            }
        case 'SET_WORD':
            return {
                ...state,
                word: action.payload
            }
        default:
            return state
    }
}

const TrendsContext = createContext()
const initialValues = {
    timeframe: 'today 3-m',
    data_url: null,
    word: null,
    result: {
        score: null,
        globalAverage: null,
        globalAttempts: null
    }
}

export const TrendsContextProvider = (props) => {
    const [trends, trendsDispatch] = useReducer(trendsReducer, initialValues)

    return (
        <TrendsContext.Provider value={[trends, trendsDispatch]}>
            {props.children}
        </TrendsContext.Provider>
    )
}

export default TrendsContext