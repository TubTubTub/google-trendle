import { useCallback } from 'react'
import wordsService from '../services/words'
import trendsService from '../services/trends'
import { useTrendsDispatch } from '../contexts/TrendsContextHooks'

const useSessionStorage = () => {
    const trendsDispatch = useTrendsDispatch()

    return useCallback(async ({ setErrorMessage }) => {
        try {
            const newWord = await wordsService.getWord(false)
            trendsDispatch({ type: 'SET_WORD', payload: newWord })
            const newLabels = await trendsService.getYAxisLabels(newWord, false)
            trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: newLabels })
        } catch(error) {
            setErrorMessage(error.message)
        }
    
        const initialTimeframeValue = sessionStorage.getItem('TIMEFRAME_VALUE')
        const initialTimeframeSize = sessionStorage.getItem('TIMEFRAME_SIZE')
        
        if (initialTimeframeValue && initialTimeframeValue !== 'null') {
            trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: initialTimeframeValue })
        }
        if (initialTimeframeSize && initialTimeframeSize !== 'null') {
            trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: initialTimeframeSize })
        }
    }, [trendsDispatch])
}

export default useSessionStorage