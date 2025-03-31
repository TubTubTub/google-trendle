import { useState } from 'react'
import { Button, Group, Text, Paper, Loader } from '@mantine/core'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'
import useCanvasControls from '../../hooks/useCanvasControls'

import { FaUndoAlt, FaRedoAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { ToolIconButton } from '../Buttons'

const CanvasControl = () => {
    const trends = useTrendsValue()
    const [undoCanvas, redoCanvas, clearCanvas, exportCanvas] = useCanvasControls()
    const [resultLoading, setResultLoading] = useState(false)

    const exportResult = async () => {
        console.log('ooooo')
        console.log(import.meta.env.VITE_BACKEND_URL)
        setResultLoading(true)
        await exportCanvas()
        setResultLoading(false)
    }

    return (
        <Group justify="space-between" style={{ flexGrow: 1 }}>
            <Button onClick={exportResult} disabled={trends.result.score}>
                {resultLoading ?
                <Loader type="bars" h='1.2rem' color='white'/>
                :
                'Export'}
            </Button>

            <Paper shadow="sm" withBorder style={{ paddingBlock: '0.5em', paddingInline: '1em' }}>
                {trends.word ? <Text fw={500} ta="center">{trends.word}</Text> : <Loader type="dots" h='1.5rem'/>}
            </Paper>

            <Group gap="0.75rem">
                <ToolIconButton label="Undo" onClick={undoCanvas} icon={<FaUndoAlt />} />
                <ToolIconButton label="Redo" onClick={redoCanvas} icon={<FaRedoAlt />} />
                <ToolIconButton label="Clear canvas" onClick={clearCanvas} icon={<FaRegTrashCan />} />
            </Group>
        </Group>
    )
}

export default CanvasControl