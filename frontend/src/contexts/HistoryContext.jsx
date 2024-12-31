import { createContext, useReducer } from 'react'
import { EMPTY_RESULT } from '../utils/constants'

const historyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_HISTORY':
            return {
                ...state,
                userHistory: action.payload
            }
        case 'EMPTY_USER_HISTORY':
            return {
                ...state,
                userHistory: []
            }
        case 'ADD_NEW_GAME':
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory,
                    {
                        word: action.payload.word,
                        labels: action.payload.labels,
                        result: EMPTY_RESULT,
                        path: null,
                    }
                ]
            }
        case 'SET_GAME_PATH':
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory.slice(0, state.currentIndex),
                    {
                        word: state.sessionHistory.at(state.currentIndex).word,
                        labels: state.sessionHistory.at(state.currentIndex).labels,
                        result: state.sessionHistory.at(state.currentIndex).result,
                        path: action.payload
                    },
                    ...(state.currentIndex === -1 ? [] : state.sessionHistory.slice(state.currentIndex + 1))
                ]
            }
        case 'SET_GAME_RESULT':
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory.slice(0, state.currentIndex),
                    {
                        word: state.sessionHistory.at(state.currentIndex).word,
                        labels: state.sessionHistory.at(state.currentIndex).labels,
                        result: action.payload,
                        path: state.sessionHistory.at(state.currentIndex).path
                    },
                    ...(state.currentIndex === -1 ? [] : state.sessionHistory.slice(state.currentIndex + 1))
                ]
            }
        case 'SET_GAME_WORD':
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory.slice(0, state.currentIndex),
                    {
                        word: action.payload,
                        labels: state.sessionHistory.at(state.currentIndex).labels,
                        result: state.sessionHistory.at(state.currentIndex).result,
                        path: state.sessionHistory.at(state.currentIndex).path
                    },
                    ...(state.currentIndex === -1 ? [] : state.sessionHistory.slice(state.currentIndex + 1))
                ]
            }
        case 'SET_GAME_LABELS':
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory.slice(0, state.currentIndex),
                    {
                        word: state.sessionHistory.at(state.currentIndex).word,
                        labels: action.payload,
                        result: state.sessionHistory.at(state.currentIndex).result,
                        path: state.sessionHistory.at(state.currentIndex).path
                    },
                    ...(state.currentIndex === -1 ? [] : state.sessionHistory.slice(state.currentIndex + 1))
                ]
            }
        
        case 'SET_CURRENT_INDEX':
            return {
                ...state,
                currentIndex: action.payload
            }
        case 'EMPTY_GAMES':
            return {
                ...state,
                sessionHistory: [],
                currentIndex: -1
            }
        default:
            return state
    }
}

const HistoryContext = createContext()

const initialValues = {
    userHistory: null,
    sessionHistory: [
        {
            word: null,
            labels: [null, null],
            result: EMPTY_RESULT,
            path: null
        }
    ],
    currentIndex: -1
}

export const HistoryContextProvider = (props) => {
    const [history, historyDispatch] = useReducer(historyReducer, initialValues)

    return (
        <HistoryContext.Provider value={[history, historyDispatch]}>
            {props.children}
        </HistoryContext.Provider>
    )
}

export default HistoryContext