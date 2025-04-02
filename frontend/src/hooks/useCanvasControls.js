import { useEffect, useCallback } from 'react'
import { useTrends } from '../contexts/TrendsContextHooks'
import { useAddError } from './useAddError'
import { useCanvasValue } from '../contexts/CanvasContextHooks'
import trendsService from '../services/trends'

export const exportPath = async (canvas) => await canvas.current.exportPaths()

export const loadPath = (canvas, path) => canvas.current.loadPaths(path)

export const clearCanvas = (canvas) => canvas.current.clearCanvas()

const useCanvasControls = () => {
    const [trends, trendsDispatch] = useTrends()
    const canvas = useCanvasValue()
    const addError = useAddError()

    const undoCanvas = useCallback(() => canvas.current.undo(), [canvas])
    const redoCanvas = useCallback(() => canvas.current.redo(), [canvas])
    const clearCanvas = useCallback(() => canvas.current.clearCanvas(), [canvas])
    const exportCanvas = useCallback(async () => {
        try {
            const dataURL = await canvas.current.exportImage('jpg')
            console.log('EXPORTED DATA URL:', dataURL)
            const result = await trendsService.submit(trends.word.slice(0, -1), dataURL, trends.timeframe)

            console.log('EXPORED DATA URL (Game.jsx):' + 'TIMEFRAME:', trends.timeframe, dataURL)

            if (result) {
                trendsDispatch({ type: 'SET_DATA_URL', payload: dataURL })
                trendsDispatch({ type: 'SET_RESULT', payload: result })
                console.log('RECEIVED DATA:', result)
            }
        } catch(error) {
            console.error(`(useCanvasControls) Error submitting trendle:`, error)
            addError(`Submission failed: ${error.message}`)
        }
    }, [canvas, trends.word, trends.timeframe, trendsDispatch, addError])

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.code == 'Enter') {
                console.log('Enter')
                exportCanvas()
            }
            else if (event.shiftKey && event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
                console.log('Redo')
                redoCanvas()
            }
            else if (!event.shiftKey && event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
                console.log('Undo')
                undoCanvas()
            }
            else if (event.code == 'KeyX' && (event.ctrlKey || event.metaKey)) {
                console.log('Clear')
                clearCanvas()
            }
        }

        if (canvas) {
            document.addEventListener('keydown', (event) => keyDownHandler(event))
        }
    }, [undoCanvas, redoCanvas, clearCanvas, exportCanvas, canvas])

    return [undoCanvas, redoCanvas, clearCanvas, exportCanvas]
}

export default useCanvasControls