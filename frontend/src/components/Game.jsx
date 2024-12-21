import { useEffect, useRef } from 'react'
import { Center, Stack, Group, Space } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useTrendsValue } from '../contexts/TrendsContextHooks'
import useSessionStorage from '../hooks/useSessionStorage'

import PreviousTrendle from './PreviousTrendle'
import NextTrendle from './NextTrendle'
import ErrorAlert from './ErrorAlert'
import GameConfig from './GameConfig'
import Canvas from './Canvas'
import Result from './Result'
import CanvasControl from './Canvas/CanvasControl'

const Game = () => {
    const [resultOpened, { open, close }] = useDisclosure(false)
    const setupSessionState = useSessionStorage()
    const trends = useTrendsValue()
    const canvas = useRef()

    const gameStyle = {
        position: 'relative',
        height: '75%',
        width: '50%',
        backgroundColor: 'green',

        transitionProperty: 'right',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease',
        right: (resultOpened ? '10vw' : 0),
        zIndex: 2,
    }

    useEffect(() => {
        console.log('CALL ONCE?')
        setupSessionState()
    }, [])

    useEffect(() => {
        trends.result.score ? open() : close()
    }, [trends.result.score, open, close])
    return (
        <Center style={{ width: '100%', height: "calc(100vh - 8rem)", gap: '2rem', backgroundColor: 'yellow' }}>
            <ErrorAlert />
            
            <Stack gap={0} style={gameStyle}>
                <Group h="20%" style={{backgroundColor:'orange'}}>
                    <Space w="2rem" />
                    <GameConfig />
                    <Space w="2rem" />
                </Group>

                <Group h="90%" style={{backgroundColor:'purple'}}>
                    <PreviousTrendle />
                    <Canvas canvas={canvas} />
                    <NextTrendle />
                </Group>

                <Group h="20%" style={{backgroundColor:'orange'}}>
                    <Space w="2rem" />
                    <CanvasControl canvas={canvas} />
                    <Space w="2rem" />
                </Group>
            </Stack>

            <Result open={resultOpened} onClose={close} />
        </Center>
    )
}

export default Game