import { useCallback } from 'react'
import { useTrendsDispatch } from '../contexts/TrendsContextHooks'
import { useSetError } from '../contexts/ErrorContextHooks'
import wordsService from '../services/words'
import trendsService from '../services/trends'

const emptyResult = {
    score: null,
    globalAverage: null,
    globalAttempts: null
}

const useNextTrendle = () => {
    const trendsDispatch = useTrendsDispatch()
    const setError = useSetError()

    return useCallback(async () => {
        try {
            trendsDispatch({ type: 'SET_WORD', payload: null })
            trendsDispatch({ type: 'SET_RESULT', payload: emptyResult })

            const newWord = await wordsService.getWord(true)
            const yAxisLabels = await trendsService.getYAxisLabels(newWord, true)

            trendsDispatch({ type: 'SET_WORD', payload: newWord })
            trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: yAxisLabels })
            trendsDispatch({ type: 'SET_DATA_URL', payload: null })
        } catch(error) {
            setError(error.message)
        }
    }, [trendsDispatch, setError])
}

export default useNextTrendle