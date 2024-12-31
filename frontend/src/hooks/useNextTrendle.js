import { useCallback } from 'react'
import { useTrends } from '../contexts/TrendsContextHooks'
import { useHistory } from '../contexts/HistoryContextHooks'
import { useSetError } from '../contexts/ErrorContextHooks'
import { exportPath, loadPath, clearCanvas } from './useCanvasControls'
import { EMPTY_RESULT } from '../utils/constants'
import wordsService from '../services/words'
import trendsService from '../services/trends'

const useNextTrendle = (canvas) => {
    const [trends, trendsDispatch] = useTrends()
    const [history, historyDispatch] = useHistory()
    const setError = useSetError()

    return useCallback(async () => {
        try {
            const path = await exportPath(canvas)
            historyDispatch({ type: 'SET_GAME_PATH', payload: path })
            historyDispatch({ type: 'SET_GAME_RESULT', payload: trends.result })
            clearCanvas(canvas)
            
            if (history.currentIndex === -1) {
                trendsDispatch({ type: 'SET_RESULT', payload: EMPTY_RESULT })
                
                const newWord = await wordsService.getWord()
                const newLabels = await trendsService.getYAxisLabels(newWord)

                trendsDispatch({ type: 'SET_WORD', payload: newWord })
                trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: newLabels })
                historyDispatch({ type: 'ADD_NEW_GAME', payload: { word: newWord, labels: newLabels }})
            } else {
                const nextGame = history.sessionHistory.at(history.currentIndex + 1)

                trendsDispatch({ type: 'SET_WORD', payload: nextGame.word })
                trendsDispatch({ type: 'SET_RESULT', payload: nextGame.result })
                trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: nextGame.labels })
                if (nextGame.path) {
                    loadPath(canvas, nextGame.path)
                }

                historyDispatch({ type: 'SET_CURRENT_INDEX', payload: history.currentIndex + 1 })
            }
            trendsDispatch({ type: 'SET_DATA_URL', payload: null })

        } catch(error) {
            console.error(`(useNextTrendle) Error loading next trendle:`, error)
            setError(error.message)
        }
    }, [trendsDispatch, historyDispatch, trends.result, history.sessionHistory, history.currentIndex, canvas, setError])
}

export default useNextTrendle