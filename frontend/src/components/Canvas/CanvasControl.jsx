import { Button, Group, Text, Paper, Loader } from '@mantine/core'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'
import useCanvasControls from '../../hooks/useCanvasControls'

import { FaUndoAlt, FaRedoAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { ToolIconButton } from '../Buttons'

const CanvasControl = ({ canvas }) => {
    const [undoCanvas, redoCanvas, clearCanvas, exportCanvas] = useCanvasControls(canvas)
    const trends = useTrendsValue()

    return (
        <Group justify="space-between" style={{ flexGrow: 1 }}>
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