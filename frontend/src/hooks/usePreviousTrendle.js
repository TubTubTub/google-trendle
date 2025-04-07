import { useCallback, useEffect, useState } from 'react'

import { useAddError } from './useAddError'
import { clearCanvas, exportPath, loadPath } from './useCanvasControls'

import { useTrends } from '../contexts/TrendsContextHooks'
import { useHistory } from '../contexts/HistoryContextHooks'
import { useCanvasValue } from '../contexts/CanvasContextHooks'

const usePreviousTrendle = () => {
    const [previousDisabled, setPreviousDisabled] = useState(true)
    const [history, historyDispatch] = useHistory()
    const [trends, trendsDispatch] = useTrends()
    const addError = useAddError()
    const canvas = useCanvasValue()

    useEffect(() => {
        history.sessionHistory.length === -history.currentIndex ? setPreviousDisabled(true) : setPreviousDisabled(false)
    }, [history.currentIndex, history.sessionHistory])

    const loadPreviousTrendle = useCallback(async () => {
        try {
            const path = await exportPath(canvas)
            historyDispatch({ type: 'SET_GAME_PATH', payload: path })
            historyDispatch({ type: 'SET_GAME_RESULT', payload: trends.result })
            clearCanvas(canvas)

            const pastGame = history.sessionHistory.at(history.currentIndex - 1)

            trendsDispatch({ type: 'SET_WORD', payload: pastGame.word })
            trendsDispatch({ type: 'SET_RESULT', payload: pastGame.result })
            trendsDispatch({ type: 'SET_DATA_URL', payload: null })

            historyDispatch({ type: 'SET_CURRENT_INDEX', payload: history.currentIndex - 1 })

            if (pastGame.path) {
                loadPath(canvas, pastGame.path)
            }

        } catch(error) {
            console.error(`(usePreviousTrendle.js) Error loading previous trendle:`, error)
            addError(`${error.message}: Failed to load  previous Trendle!`)
        }

    }, [trendsDispatch, historyDispatch, trends.result, history.sessionHistory, history.currentIndex, canvas, addError])

    return [previousDisabled, loadPreviousTrendle]
}

export default usePreviousTrendle