import { useCallback } from 'react'
import { useTrends } from '../contexts/TrendsContextHooks'
import { useHistory } from '../contexts/HistoryContextHooks'
import { useSetError } from '../contexts/ErrorContextHooks'

const emptyResult = {
    score: null,
    globalAverage: null,
    globalAttempts: null
}

const usePreviousTrendle = () => {
    const [trends, trendsDispatch] = useTrends()
    const [history, historyDispatch] = useHistory()
    const setError = useSetError()

    return useCallback(async () => {
        try {
            const pastGame = history.sessionHistory.at(history.sessionIndex - 1)
            console.log('GETTIG PAST GAME', history.sessionIndex - 1, history.sessionHistory)

            trendsDispatch({ type: 'SET_WORD', payload: pastGame.word })
            trendsDispatch({ type: 'SET_RESULT', payload: pastGame.result })
            trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: pastGame.yAxisLabels })

            historyDispatch({ type: 'SET_SESSION_INDEX', payload: history.sessionIndex - 1 })
        } catch(error) {
            console.error(`(usePreviousTrendle) Error loading previous trendle:`, error)
            setError(error.message)
        }
    }, [trendsDispatch, historyDispatch, history.sessionHistory, history.sessionIndex, setError])
}

export default usePreviousTrendle