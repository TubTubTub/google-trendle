import { useEffect } from 'react'
import { Center, Group, Space, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'


import CanvasControl from './Canvas/CanvasControl'
import PreviousTrendle from './PreviousTrendle'
import NextTrendle from './NextTrendle'
import ErrorAlert from './ErrorAlert'
import GameConfig from './GameConfig'
import Canvas from './Canvas'
import Result from './Result'

import useSessionStorage from '../hooks/useSessionStorage'
import { useTrendsValue } from '../contexts/TrendsContextHooks'
import { useHistoryDispatch, useHistoryValue } from '../contexts/HistoryContextHooks'

const Game = () => {
    const [resultOpened, { open, close }] = useDisclosure(false)
    const [getStorage, setupStorage] = useSessionStorage()
    const historyDispatch = useHistoryDispatch()
    const history = useHistoryValue()
    const trends = useTrendsValue()

    const gameStyle = {
        position: 'relative',
        height: '75%',
        width: '50%',

        transitionProperty: 'right',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease',
        right: (resultOpened ? '10vw' : 0),
        zIndex: 2,
    }

    useEffect(() => {
        const [sessionWord, sessionValue, sessionSize] = getStorage()
        setupStorage(sessionWord, sessionValue, sessionSize).then(
            (currentWord) => { historyDispatch({ type: 'SET_GAME_WORD', payload: currentWord }) }
        )
    }, [getStorage, setupStorage, historyDispatch, history.sessionHistory.length])

    useEffect(() => {
        trends.result.score !== null ? open() : close()
    }, [trends.result.score, open, close])

    return (
        <Center gap="2rem" w="100%" h="calc(100vh - 8rem)">
            <ErrorAlert />

            <Stack gap={0} style={gameStyle}>
                <Group h="20%">
                    <Space w="2rem" />
                    <GameConfig />
                    <Space w="2rem" />
                </Group>

                <Group h="80%">
                    <PreviousTrendle />
                    <Canvas />
                    <NextTrendle />
                </Group>

                <Group h="20%">
                    <Space w="2rem" />
                    <CanvasControl />
                    <Space w="2rem" />
                </Group>
            </Stack>

            <Result open={resultOpened} onClose={close} />
        </Center>
    )
}

export default Game