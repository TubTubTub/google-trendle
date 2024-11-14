import { createContext, useReducer } from 'react'

const historyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HISTORY':
            return {
                ...state,
                history: action.payload
            }
        case 'EMPTY_HISTORY':
            return {
                ...state,
                history: []
            }
        default:
            return state
    }
}

const HistoryContext = createContext()

const initialValues = {
    history: []
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