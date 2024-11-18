import { useEffect } from 'react'
import { Center, Stack, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useTrendsValue } from '../contexts/TrendsContextHooks'
import useSessionStorage from '../hooks/useSessionStorage'

import PreviousTrendle from './PreviousTrendle'
import NextTrendle from './NextTrendle'
import ErrorAlert from './ErrorAlert'
import GameConfig from './GameConfig'
import Canvas from './Canvas'
import Result from './Result'

const Game = () => {
    const [resultOpened, { open, close }] = useDisclosure(false)
    const setupSessionState = useSessionStorage()
    const trends = useTrendsValue()

    const gameStyle = {
        position: 'relative',
        transitionProperty: 'right',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease',
        right: (resultOpened ? '10vw' : 0),
        zIndex: 2,
    }

    useEffect(() => {
        setupSessionState()
    }, [])

    useEffect(() => {
        trends.result.score ? open() : close()
    }, [trends.result.score, open, close])
    
    return (
        <Center style={{ height: "80vh", gap: '2em' }}>
            <ErrorAlert />

            <Group style={gameStyle}>
                <PreviousTrendle />
                <Stack>
                    <GameConfig />
                    <Canvas />
                </Stack>
                <NextTrendle />
            </Group>

            <Result open={resultOpened} onClose={close} />
        </Center>
    )
}

export default Game