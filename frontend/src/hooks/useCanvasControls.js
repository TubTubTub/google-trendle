import { useEffect, useCallback } from 'react'
import { useTrends } from '../contexts/TrendsContextHooks'
import trendsService from '../services/trends'

const useCanvasControls = (canvas) => {
    const [trends, trendsDispatch] = useTrends()

    const undoCanvas = useCallback(() => canvas.current.undo(), [canvas])
    const redoCanvas = useCallback(() => canvas.current.redo(), [canvas])
    const clearCanvas = useCallback(() => canvas.current.clearCanvas(), [canvas])
    const exportCanvas = useCallback(async () => {
        try {
            const dataURL = await canvas.current.exportImage('jpeg')
            const result = await trendsService.submit(trends.word.slice(0, -1), dataURL, 'today 1-m')

            console.log('EXPORED DATA URL (Game.jsx):', dataURL)

            if (result) {
                trendsDispatch({ type: 'SET_DATA_URL', payload: dataURL })
                trendsDispatch({ type: 'SET_RESULT', payload: result })
                console.log('RECEIVED DATA:', result)
            }

        } catch(error) {
            console.log('(useCanvasControls.exportCanvas) Error exporting canvas:', error)
        }
    }, [canvas, trends.word, trendsDispatch])

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
            else if (event.code == 'KeyR' && (event.ctrlKey || event.metaKey)) {
                console.log('Clear')
                clearCanvas()
            }
    }
        document.addEventListener('keydown', (event) => keyDownHandler(event))
    }, [undoCanvas, redoCanvas, clearCanvas, exportCanvas])

    return [undoCanvas, redoCanvas, clearCanvas, exportCanvas]
}

export default useCanvasControls