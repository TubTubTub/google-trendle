import { useCallback } from "react"

import { useErrorDispatch } from "../contexts/ErrorContextHooks"

export const useAddError = () => {
    const errorDispatch = useErrorDispatch()

    return useCallback((error) => {
        errorDispatch({ type: 'ADD_ERROR', payload: error })
        setTimeout(() => errorDispatch({ type: 'SHIFT_ERROR_QUEUE'}), 3000)
    }, [errorDispatch])
}

export default useAddError