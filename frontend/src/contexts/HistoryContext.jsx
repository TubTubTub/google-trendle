import { createContext, useReducer } from 'react'

import { EMPTY_RESULT } from '../utils/constants'

const historyReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NEW_GAME':
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory,
                    {
                        word: action.payload.word,
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
    sessionHistory: [
        {
            word: null,
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