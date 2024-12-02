import { useEffect, useRef } from 'react'
import { Center, Stack, Group, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useTrendsValue } from '../contexts/TrendsContextHooks'
import { useHistoryValue } from '../contexts/HistoryContextHooks'
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
    const { sessionHistory }  = useHistoryValue()
    const theme = useMantineTheme()
    const canvas = useRef()

    const gameStyle = {
        position: 'relative',
        height: '75%',
        width: '50%',
        gap: 0,
        justifyContent: 'space-between',
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
        <Center style={{ width: '100%', height: "calc(100vh - 110px)", gap: '2em' }}>
            <ErrorAlert />

            <Group style={gameStyle}>
                <PreviousTrendle />
                <Stack style={{
                        flexGrow: 1,
                        width: `calc(100% - 2 * ${theme.other.canvasButtonHeight})`,
                        height: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <GameConfig />
                    <Canvas canvas={canvas} />
                    <CanvasControl canvas={canvas} />
                </Stack>
                <NextTrendle />
            </Group>

            <Result open={resultOpened} onClose={close} />
        </Center>
    )
}

export default Game