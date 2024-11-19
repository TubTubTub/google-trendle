import { useCallback } from 'react'
import { useTrends } from '../contexts/TrendsContextHooks'
import { useHistory } from '../contexts/HistoryContextHooks'
import { useSetError } from '../contexts/ErrorContextHooks'
import wordsService from '../services/words'
import trendsService from '../services/trends'

const emptyResult = {
    score: null,
    globalAverage: null,
    globalAttempts: null
}

const useNextTrendle = () => {
    const [trends, trendsDispatch] = useTrends()
    const [history, historyDispatch] = useHistory()
    const setError = useSetError()

    return useCallback(async () => {
        try {
            const fetchNewWord = (history.sessionIndex === -1)
            console.log('NEXT TRENDLE', history.sessionHistory, history.sessionIndex)
            
            historyDispatch({ type: 'SET_CURRENT_SESSION_RESULT', payload: trends.result})
            if (fetchNewWord) {
                trendsDispatch({ type: 'SET_RESULT', payload: emptyResult })

                const newWord = await wordsService.getWord(true)
                const yAxisLabels = await trendsService.getYAxisLabels(newWord, true)

                trendsDispatch({ type: 'SET_WORD', payload: newWord })
                trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: yAxisLabels })
                historyDispatch({ type: 'APPEND_SESSION_HISTORY', payload: { word: newWord, result: emptyResult, yAxisLabels: yAxisLabels}})
            } else {
                console.log('GETTIG PAST GAME', history.sessionIndex + 1, history.sessionHistory)
                const pastGame = history.sessionHistory.at(history.sessionIndex + 1)

                trendsDispatch({ type: 'SET_WORD', payload: pastGame.word })
                trendsDispatch({ type: 'SET_RESULT', payload: pastGame.result })
                trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: pastGame.yAxisLabels })
                historyDispatch({ type: 'SET_SESSION_INDEX', payload: history.sessionIndex + 1 })
            }

            trendsDispatch({ type: 'SET_DATA_URL', payload: null })
            console.log(history.sessionIndex)
        } catch(error) {
            console.error(`(useNextTrendle) Error loading next trendle:`, error)
            setError(error.message)
        }
    }, [trendsDispatch, historyDispatch, trends.word, trends.result, history.sessionHistory, history.sessionIndex, trends.yAxisLabels, setError])
}

export default useNextTrendle