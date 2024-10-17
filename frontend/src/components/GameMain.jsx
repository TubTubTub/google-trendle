import { useState, useEffect } from 'react'
import { Center, Stack, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import ErrorAlert from './ErrorAlert'
import Canvas from './Canvas'
import GameConfig from './GameConfig'
import PreviousTrendle from './PreviousTrendle'
import NextTrendle from './NextTrendle'
import Result from './Result'

import { useTrends } from '../contexts/TrendsContextHooks'
import wordsService from '../services/words'
import trendsService from '../services/trends'

const GameMain = () => {
    const [trends, trendsDispatch] = useTrends()
    const [error, setError] = useState('')
    const [resultOpened, { open, close }] = useDisclosure(false)

    useEffect(() => {
        wordsService.getWord(false)
            .then(newWord => {
                trendsDispatch({ type: 'SET_WORD', payload: newWord })

                trendsService.getYAxisLabels(newWord, false)
                    .then(labelsResult => {
                        trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: labelsResult })
                    })
                    .catch(error => setErrorMessage(error.message))

            })
            .catch(error => setErrorMessage(error.message))
        
        const initialTimeframeValue = sessionStorage.getItem('TIMEFRAME_VALUE')
        const initialTimeframeSize = sessionStorage.getItem('TIMEFRAME_SIZE')
        
        if (initialTimeframeValue && initialTimeframeValue !== 'null') {
            trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: initialTimeframeValue })
        }
        if (initialTimeframeSize && initialTimeframeSize !== 'null') {
            trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: initialTimeframeSize })
        }
    }, [])

    const setErrorMessage = (message) => {
        setError(message)
        setTimeout(() => setError(''), 3000)
    }

    useEffect(() => {
        trends.result.score ? open() : close()
    }, [trends.result.score, open, close])

    const gameStyle = {
        position: 'relative',
        transitionProperty: 'right',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease',
        right: (resultOpened ? '10vw' : 0),
        zIndex: 2,
    }

    return (
        <Center style={{ height: "80vh", gap: '2em' }}>
            <ErrorAlert message={error} />

            <Group style={gameStyle}>
                <PreviousTrendle setErrorMessage={setErrorMessage} />
                <Stack>
                    <GameConfig />
                    <Canvas />
                </Stack>
                <NextTrendle setErrorMessage={setErrorMessage} />
            </Group>

            <Result open={resultOpened} onClose={close} />
        </Center>
    )
}

export default GameMain