import { useContext } from 'react'
import HistoryContext from './HistoryContext'


export const useHistory = () => {
    const historyAndDispatch = useContext(HistoryContext)
    return historyAndDispatch
}

export const useHistoryValue = () => {
    const historyAndDispatch = useContext(HistoryContext)
    return historyAndDispatch[0]
}

export const useHistoryDispatch = () => {
    const historyAndDispatch = useContext(HistoryContext)
    return historyAndDispatch[1]
}