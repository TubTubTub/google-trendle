import { useCallback, useEffect } from 'react'

import { useAddError } from './useAddError'

import { useTrends } from '../contexts/TrendsContextHooks'
import { useCanvasValue } from '../contexts/CanvasContextHooks'
import { useProfileValue } from '../contexts/ProfileContextHooks'
import trendsService from '../services/trends'

export const exportPath = async (canvas) => await canvas.current.exportPaths()

export const loadPath = (canvas, path) => canvas.current.loadPaths(path)

export const clearCanvas = (canvas) => canvas.current.clearCanvas()

const useCanvasControls = () => {
    const [trends, trendsDispatch] = useTrends()
    const canvas = useCanvasValue()
    const profile = useProfileValue()
    const addError = useAddError()

    const undoCanvas = useCallback(() => canvas.current.undo(), [canvas])
    const redoCanvas = useCallback(() => canvas.current.redo(), [canvas])
    const clearCanvas = useCallback(() => canvas.current.clearCanvas(), [canvas])
    const exportCanvas = useCallback(async () => {
        try {
            const dataURL = await canvas.current.exportImage('jpg')
            const result = await trendsService.submit(trends.word, dataURL, trends.timeframe, profile.profile ? profile.profile.id : null)
            console.info(`(useCanvasControls.js) Exported DataURL: ${dataURL.slice(0, 20)} | Timeframe: ${trends.timeframe}`)

            if (result) {
                trendsDispatch({ type: 'SET_DATA_URL', payload: dataURL })
                trendsDispatch({ type: 'SET_RESULT', payload: result })
                console.info(`(useCanvasControls.js) Received data: ${result}`)
            }
        } catch(error) {
            console.error(`(useCanvasControls.js) Error submitting trendle:`, error)
            addError(`Submission failed: ${error.message}`)
        }
    }, [canvas, trends.word, trends.timeframe, trendsDispatch, profile, addError])

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.code == 'Enter') {
                console.debug('(useCanvasControls.js) Enter key pressed')
                exportCanvas()
            }
            else if (event.shiftKey && event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
                console.debug('(useCanvasControls.js) Redo key pressed')
                redoCanvas()
            }
            else if (!event.shiftKey && event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
                console.debug('(useCanvasControls.js) Undo key pressed')
                undoCanvas()
            }
            else if (event.code == 'KeyX' && (event.ctrlKey || event.metaKey)) {
                console.debug('(useCanvasControls.js) Clear key pressed')
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