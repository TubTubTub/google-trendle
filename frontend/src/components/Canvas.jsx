import { useRef, useEffect } from 'react'
import { Button, Group } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { FaUndoAlt, FaRedoAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { ToolIconButton } from './Buttons'

import trendsService from '../services/trends'

const Canvas = () => {
    const canvas = useRef()

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

    const exportCanvas = async () => {
        try {
            const data_url = await canvas.current.exportImage('jpeg')
            console.log(data_url)
            const result = await trendsService.submit(data_url, 'today 1-m')
            if (result) {
                console.log('Successfully received data!')
            }
        } catch(error) {
            console.log(error)
        }
    }
    const undoCanvas = () => canvas.current.undo()
    const redoCanvas = () => canvas.current.redo()
    const clearCanvas = () => canvas.current.clearCanvas()

    return (
        <div>
            <ReactSketchCanvas
                width={800}
                height={400}
                strokeWidth={4}
                strokeColor="black"
                ref={canvas}
            />
            <Group justify="space-between" py="xs">
                <Button onClick={exportCanvas}>
                    Export
                </Button>
                <Group gap="0.75em">
                    <ToolIconButton label="Undo" onClick={undoCanvas} icon={<FaUndoAlt />} />
                    <ToolIconButton label="Redo" onClick={redoCanvas} icon={<FaRedoAlt />} />
                    <ToolIconButton label="Clear canvas" onClick={clearCanvas} icon={<FaRegTrashCan />} />
                </Group>
            </Group>
        </div>
    )
}

export default Canvas