import { useRef, useEffect } from 'react'
import { Button, Group, Stack, Text, Paper, useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { FaUndoAlt, FaRedoAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { PiLineVerticalBold } from 'react-icons/pi'
import { ToolIconButton } from './Buttons'

import { useTrends } from '../contexts/TrendsContextHooks'
import trendsService from '../services/trends'

import backgroundSVG from '../assets/background.svg'

const XAxis = ({ number }) => {
    return (
        <Group justify="space-between">
            {
                Array(number).fill(0).map((_, index) => (
                    <Stack key={index} gap={0}>
                        <PiLineVerticalBold style={{ marginTop: '-1px' }} color="gray" size="0.75em" />
                        <Text fw={500} c="dimmed">hi</Text>
                    </Stack>
                ))
            }
        </Group>
    )
}

const Game = () => {
    const [trends, trendsDispatch] = useTrends()
    const { colorScheme, _ } = useMantineColorScheme()
    const theme = useMantineTheme()
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

    const undoCanvas = () => canvas.current.undo()
    const redoCanvas = () => canvas.current.redo()
    const clearCanvas = () => canvas.current.clearCanvas()

    const exportCanvas = async () => {
        try {
            const data_url = await canvas.current.exportImage('jpeg')
            const result = await trendsService.submit(data_url, 'today 1-m')

            console.log('EXPORED DATA URL (Game.jsx):', data_url)
            if (result) {
                trendsDispatch({ type: 'SET_DATA_URL', payload: data_url })
                trendsDispatch({ type: 'SET_RESULT', payload: result })
                console.log('RECEIVED DATA:', result)
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Stack gap={0}>
            <ReactSketchCanvas
                width={800}
                height={400}
                strokeWidth={4}
                strokeColor={colorScheme === 'dark' ? 'white' : 'black' }
                canvasColor={colorScheme === 'dark' ? theme.colors.dark[4] : 'white' }
                ref={canvas}
                backgroundImage={backgroundSVG}
            />
            <XAxis number={Number(trends.timeframe.match(/\d+/)) + 1} />

            <Group justify="space-between" py="xs">
                <Button onClick={exportCanvas} disabled={trends.result.score}>
                    Export
                </Button>
                <Paper shadow="sm" withBorder style={{ paddingBlock: '0.5em', paddingInline: '1em' }}>
                    <Text fw={500} ta="center">{trends.word}</Text>
                </Paper>
                <Group gap="0.75em">
                    <ToolIconButton label="Undo" onClick={undoCanvas} icon={<FaUndoAlt />} />
                    <ToolIconButton label="Redo" onClick={redoCanvas} icon={<FaRedoAlt />} />
                    <ToolIconButton label="Clear canvas" onClick={clearCanvas} icon={<FaRegTrashCan />} />
                </Group>
            </Group>
        </Stack>
    )
}

export default Game