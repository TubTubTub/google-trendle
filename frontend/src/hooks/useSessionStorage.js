import { useCallback } from 'react'
import { useTrendsDispatch } from '../contexts/TrendsContextHooks'
import { useHistoryDispatch } from '../contexts/HistoryContextHooks'
import { useSetError } from '../contexts/ErrorContextHooks'
import wordsService from '../services/words'
import trendsService from '../services/trends'

const emptyResult = {
    score: null,
    globalAverage: null,
    globalAttempts: null
}

const useSessionStorage = () => {
    const trendsDispatch = useTrendsDispatch()
    const historyDispatch = useHistoryDispatch()
    const setError = useSetError()

    return useCallback(async () => {
        try {
            const newWord = await wordsService.getWord(false)
            trendsDispatch({ type: 'SET_WORD', payload: newWord })
            const newLabels = await trendsService.getYAxisLabels(newWord, false)
            trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: newLabels })
            
            historyDispatch({ type: 'APPEND_SESSION_HISTORY', payload: { word: newWord, result: emptyResult, yAxisLabels: newLabels }})
        } catch(error) {
            setError(error.message)
        }
    
        const initialTimeframeValue = sessionStorage.getItem('TIMEFRAME_VALUE')
        const initialTimeframeSize = sessionStorage.getItem('TIMEFRAME_SIZE')
        
        if (initialTimeframeValue && initialTimeframeValue !== 'null') {
            trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: initialTimeframeValue })
        }
        if (initialTimeframeSize && initialTimeframeSize !== 'null') {
            trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: initialTimeframeSize })
        }
    }, [trendsDispatch, historyDispatch, setError])
}

export default useSessionStorage