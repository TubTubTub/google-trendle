import { createContext, useReducer } from 'react'

const errorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                errorQueue: [...state.errorQueue, action.payload]
            }
        case 'POP_ERROR_QUEUE':
            return {
                errorQueue: state.errorQueue.slice(1)
            }
        default:
            return state
    }
}

const ErrorContext = createContext()

const initialValues = {
    errorQueue: []
}

export const ErrorContextProvider = (props) => {
    const [error, errorDispatch] = useReducer(errorReducer, initialValues)

    return (
        <ErrorContext.Provider value={[error, errorDispatch]}>
            {props.children}
        </ErrorContext.Provider>
    )
}

export default ErrorContext