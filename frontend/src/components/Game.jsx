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

const XAxis = ({ size, number }) => {
    const labelsArray = []
    const currentDate = new Date()
    if (size === 'm') {
        currentDate.setMonth(currentDate.getMonth() + 1)
        
        for (let i = 0 ; i < number ; i++) {
            currentDate.setMonth(currentDate.getMonth() - 1)
            labelsArray.push(currentDate.getMonth() + 1)
        }
    }
    else if (size === 'y') {
        currentDate.setYear(currentDate.getFullYear())
        
        for (let i = 0 ; i < number ; i++) {
            currentDate.setYear(currentDate.getFullYear() - 1)
            labelsArray.push(currentDate.getFullYear() + 1)
        }
    }
    return (
        <Group justify="space-between">
            {
                labelsArray.reverse().map((label, index) => (
                    <Stack key={index} gap={0}>
                        <PiLineVerticalBold style={{ marginTop: '-1px' }} color="gray" size="0.75em" />
                        <Text fw={500} c="dimmed">{label}</Text>
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
            <XAxis size={trends.timeframe.at(-1)} number={Number(trends.timeframe.match(/\d+/)) + 1} />

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