import { useState, useEffect } from 'react'
import { Center, Stack, Transition, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IoIosArrowBack } from 'react-icons/io'

import { ToolIconButton } from './Buttons'
import ErrorAlert from './ErrorAlert'
import Game from './Game'
import GameSettings from './GameSettings'
import NextTrendle from './NextTrendle'
import Result from './Result'

import { useTrends } from '../contexts/TrendsContextHooks'
import wordsService from '../services/words'
import trendsService from '../services/trends'

const GameMain = () => {
    const [trends, trendsDispatch] = useTrends()
    const [error, setError] = useState('')
    const [resultOpened, { open, close }] = useDisclosure(false)

    const setErrorMessage = (message) => {
        setError(message)
        setTimeout(() => setError(''), 3000)
    }

    useEffect(() => {
        wordsService.getWord()
            .then(wordResult => {
                trendsDispatch({ type: 'SET_WORD', payload: wordResult.data })

                trendsService.getYAxisLabels(wordResult.data)
                    .then(labelsResult => {
                        trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: labelsResult.data })
                    })
                    .catch(error => setErrorMessage(error.message))

            })
            .catch(error => setErrorMessage(error.message))
    }, [])

    useEffect(() => {
        trends.result.score ? open() : close()
        console.log(trends.result.score ? 'opened' : 'closed')
    }, [trends.result.score, open, close])

    const gameStyle = {
        position: 'relative',
        transitionProperty: 'right',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease',
        right: (resultOpened ? '10vw' : 0)
    }

    return (
        <Center style={{ height: "80vh", gap: '2em' }}>
            <ErrorAlert message={error} />

            <Group style={gameStyle}>
                <ToolIconButton label="Previous trendle" onClick={() => console.log('back')} icon={<IoIosArrowBack />} tooltip />
                <Stack>
                    <GameSettings />
                    <Game />
                </Stack>
                <NextTrendle setErrorMessage={setErrorMessage} />
                    <Text fw={500} c="dimmed" style={{ position: 'absolute', left: '3.5em', transform: 'translateY(-87px)' }}>{trends.yAxisLabels[0]}</Text>
                    <Text fw={500} c="dimmed" style={{ position: 'absolute', left: '3.5em', transform: 'translateY(+53px)' }}>{trends.yAxisLabels[1]}</Text>
            </Group>

            <Transition
                mounted={resultOpened}
                transition="slide-right"
                duration={200}
                timingFunction="ease"
                keepMounted
            >
                {(transitionStyle) => (
                    <Result onClose={close} style={{...transitionStyle, zIndex: 1, position: 'absolute', right: '24vw' }} />
                )}
            </Transition>
        </Center>
    )
}

export default GameMain