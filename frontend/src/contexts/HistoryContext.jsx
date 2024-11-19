import { createContext, useReducer } from 'react'

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
        case 'APPEND_SESSION_HISTORY':
            console.log('(sessh) appending', action.payload)
            return {
                ...state,
                sessionHistory: [...state.sessionHistory, action.payload]
            }
        case 'SET_CURRENT_SESSION_RESULT':
            console.log('setting result', [
                ...state.sessionHistory.slice(0, state.sessionIndex),
                {
                    word: state.sessionHistory.at(state.sessionIndex).word,
                    result: action.payload,
                    yAxisLabels: state.sessionHistory.at(state.sessionIndex).yAxisLabels
                },
                ...(state.sessionIndex === -1 ? [] : state.sessionHistory.slice(state.sesisonIndex + 1))
            ])
            return {
                ...state,
                sessionHistory: [
                    ...state.sessionHistory.slice(0, state.sessionIndex),
                    {
                        word: state.sessionHistory.at(state.sessionIndex).word,
                        result: action.payload,
                        yAxisLabels: state.sessionHistory.at(state.sessionIndex).yAxisLabels
                    },
                    ...(state.sessionIndex === -1 ? [] : state.sessionHistory.slice(state.sesisonIndex + 1))
                ]
            }
        case 'SET_SESSION_INDEX':
            return {
                ...state,
                sessionIndex: action.payload
            }
        default:
            return state
    }
}

const HistoryContext = createContext()

const initialValues = {
    userHistory: null,
    sessionHistory: [],
    sessionIndex: -1
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