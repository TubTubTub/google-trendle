import { useContext } from 'react'
import ErrorContext from './ErrorContext'


export const useError = () => {
    const errorAndDispatch = useContext(ErrorContext)
    return errorAndDispatch
}

export const useErrorValue = () => {
    const errorAndDispatch = useContext(ErrorContext)
    return errorAndDispatch[0]
}

export const useErrorDispatch = () => {
    const errorAndDispatch = useContext(ErrorContext)
    return errorAndDispatch[1]
}

export const useSetError = () => {
    const errorDispatch = useErrorDispatch()
    return (errorMessage) => errorDispatch({ type: 'SET_ERROR', payload: errorMessage })
}