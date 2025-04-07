import { useCallback } from "react"

import wordsService from '../services/words'
import { useTrendsDispatch } from "../contexts/TrendsContextHooks"

const useSessionStorage = () => {
    const trendsDispatch = useTrendsDispatch()

    const getSessionStorage = useCallback(() => {
        const word = sessionStorage.getItem('WORD')
        const timeframeValue = sessionStorage.getItem('TIMEFRAME_VALUE')
        const timeframeSize = sessionStorage.getItem('TIMEFRAME_SIZE')

        return [word, timeframeValue, timeframeSize]
    }, [])

    const initialiseSessionStorage = useCallback(async (word, timeframeValue, timeframeSize) => {
        let newWord = word ? word : await wordsService.getWord()

        trendsDispatch({ type: 'SET_WORD', payload: newWord })

        if ((timeframeValue !== 'undefined') && (timeframeValue !== 'null') && (timeframeValue !== null)) {
            trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: timeframeValue })
        }
        if ((timeframeSize !== 'undefined') && (timeframeSize !== 'null') && (timeframeValue !== null)) {
            trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: timeframeSize })
        }

        return newWord
    }, [trendsDispatch])

    return [getSessionStorage, initialiseSessionStorage]
}

export default useSessionStorage