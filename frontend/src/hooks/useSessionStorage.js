import { useCallback } from "react"

import wordsService from '../services/words'
import trendsService from '../services/trends'
import { useTrendsDispatch } from "../contexts/TrendsContextHooks"

const useSessionStorage = () => {
    const trendsDispatch = useTrendsDispatch()

    const getSessionStorage = useCallback(() => {
        const word = sessionStorage.getItem('WORD')
        const y_labels = sessionStorage.getItem('Y_LABELS')
        const timeframeValue = sessionStorage.getItem('TIMEFRAME_VALUE')
        const timeframeSize = sessionStorage.getItem('TIMEFRAME_SIZE')

        return [word, y_labels, timeframeValue, timeframeSize]
    }, [])

    const initialiseSessionStorage = useCallback(async (word, y_labels, timeframeValue, timeframeSize) => {
        let newWord = word ? word : await wordsService.getWord()
        let newLabels = y_labels ? y_labels : await trendsService.getYAxisLabels(newWord)

        trendsDispatch({ type: 'SET_WORD', payload: newWord })
        trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: newLabels })

        if ((timeframeValue !== 'undefined') && (timeframeValue !== 'null') && (timeframeValue !== null)) {
            trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: timeframeValue })
        }
        if ((timeframeSize !== 'undefined') && (timeframeSize !== 'null') && (timeframeValue !== null)) {
            trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: timeframeSize })
        }

        return [newWord, newLabels]
    }, [trendsDispatch])

    return [getSessionStorage, initialiseSessionStorage]
}

export default useSessionStorage