import { useCallback } from 'react'

import { useAddError } from './useAddError'
import { clearCanvas, exportPath, loadPath } from './useCanvasControls'

import { useTrends } from '../contexts/TrendsContextHooks'
import { useHistory } from '../contexts/HistoryContextHooks'
import { useCanvasValue } from '../contexts/CanvasContextHooks'
import { EMPTY_RESULT } from '../utils/constants'
import wordsService from '../services/words'

const useNextTrendle = () => {
    const [trends, trendsDispatch] = useTrends()
    const [history, historyDispatch] = useHistory()
    const addError = useAddError()
    const canvas = useCanvasValue()

    return useCallback(async () => {
        try {
            const path = await exportPath(canvas)
            historyDispatch({ type: 'SET_GAME_PATH', payload: path })
            historyDispatch({ type: 'SET_GAME_RESULT', payload: trends.result })
            clearCanvas(canvas)

            if (history.currentIndex === -1) {
                trendsDispatch({ type: 'SET_RESULT', payload: EMPTY_RESULT })
                trendsDispatch({ type: 'SET_WORD', payload: null })

                const newWord = await wordsService.getWord()

                trendsDispatch({ type: 'SET_WORD', payload: newWord })
                historyDispatch({ type: 'ADD_NEW_GAME', payload: { word: newWord }})
            } else {
                const nextGame = history.sessionHistory.at(history.currentIndex + 1)

                trendsDispatch({ type: 'SET_WORD', payload: nextGame.word })
                trendsDispatch({ type: 'SET_RESULT', payload: nextGame.result })
                if (nextGame.path) {
                    loadPath(canvas, nextGame.path)
                }

                historyDispatch({ type: 'SET_CURRENT_INDEX', payload: history.currentIndex + 1 })
            }
            trendsDispatch({ type: 'SET_DATA_URL', payload: null })

        } catch(error) {
            console.error(`(useNextTrendle.js) Error loading next trendle: ${error}`)
            addError(`${error.message}: Failed to load next Trendle!`)
        }
    }, [trendsDispatch, historyDispatch, trends.result, history.sessionHistory, history.currentIndex, canvas, addError])
}

export default useNextTrendle