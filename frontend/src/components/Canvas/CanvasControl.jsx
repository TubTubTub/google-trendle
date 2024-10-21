import { useEffect } from 'react'
import { Button, Group, Text, Paper, Loader } from '@mantine/core'
import { FaUndoAlt, FaRedoAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { ToolIconButton } from '../Buttons'

import { useTrends } from '../../contexts/TrendsContextHooks'
import trendsService from '../../services/trends'

const CanvasControl = ({ canvas }) => {
    const [trends, trendsDispatch] = useTrends()

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
    }, [])

    const undoCanvas = () => canvas.current.undo()
    const redoCanvas = () => canvas.current.redo()
    const clearCanvas = () => canvas.current.clearCanvas()
    const exportCanvas = async () => {
        try {
            const dataURL = await canvas.current.exportImage('jpeg')
            const result = await trendsService.submit(dataURL, 'today 1-m')

            console.log('EXPORED DATA URL (Game.jsx):', dataURL)

            if (result) {
                trendsDispatch({ type: 'SET_DATA_URL', payload: dataURL })
                trendsDispatch({ type: 'SET_RESULT', payload: result })
                console.log('RECEIVED DATA:', result)
            }

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Group justify="space-between" py="xs">
            <Button onClick={exportCanvas} disabled={trends.result.score}>
                Export
            </Button>

            <Paper shadow="sm" withBorder style={{ paddingBlock: '0.5em', paddingInline: '1em' }}>
                <Text fw={500} ta="center">{trends.word}</Text>
                {trends.word ? null : <Loader type="dots" style={{ height: '1.5em' }} />}
            </Paper>

            <Group gap="0.75em">
                <ToolIconButton label="Undo" onClick={undoCanvas} icon={<FaUndoAlt />} />
                <ToolIconButton label="Redo" onClick={redoCanvas} icon={<FaRedoAlt />} />
                <ToolIconButton label="Clear canvas" onClick={clearCanvas} icon={<FaRegTrashCan />} />
            </Group>
        </Group>
    )
}

export default CanvasControl