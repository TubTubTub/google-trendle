import { useCallback, useState, useEffect } from 'react'
import { useTrends } from '../contexts/TrendsContextHooks'
import { useHistory } from '../contexts/HistoryContextHooks'
import { useSetError } from '../contexts/ErrorContextHooks'

const usePreviousTrendle = () => {
    const [previousDisabled, setPreviousDisabled] = useState(true)
    const [history, historyDispatch] = useHistory()
    const [trends, trendsDispatch] = useTrends()
    const setError = useSetError()

    useEffect(() => {
        history.sessionHistory.length === -history.sessionIndex ? setPreviousDisabled(true) : setPreviousDisabled(false)
    }, [history.sessionIndex, history.sessionHistory])
    
    const loadPreviousTrendle = useCallback(async () => {
        try {
            historyDispatch({ type: 'SET_CURRENT_SESSION_RESULT', payload: trends.result })
            const pastGame = history.sessionHistory.at(history.sessionIndex - 1)
            console.log('GETTIG PAST GAME', history.sessionIndex - 1, history.sessionHistory)

            trendsDispatch({ type: 'SET_WORD', payload: pastGame.word })
            trendsDispatch({ type: 'SET_RESULT', payload: pastGame.result })
            trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: pastGame.yAxisLabels })

            historyDispatch({ type: 'SET_SESSION_INDEX', payload: history.sessionIndex - 1 })

            trendsDispatch({ type: 'SET_DATA_URL', payload: null })

        } catch(error) {
            console.error(`(usePreviousTrendle) Error loading previous trendle:`, error)
            setError(error.message)
        }

    }, [trendsDispatch, historyDispatch, history.sessionHistory, history.sessionIndex, trends.result, setError])

    return [previousDisabled, loadPreviousTrendle]
}

export default usePreviousTrendle