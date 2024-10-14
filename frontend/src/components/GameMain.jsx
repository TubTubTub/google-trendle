import { useState, useEffect } from 'react'
import { Center, Stack, Transition, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { ToolIconButton } from './Buttons'
import ErrorAlert from './ErrorAlert'
import Game from './Game'
import GameSettings from './GameSettings'
import Result from './Result'

import { useTrends } from '../contexts/TrendsContextHooks'
import wordsService from '../services/words'

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
            .then(result => {
                trendsDispatch({ type: 'SET_WORD', payload: result.data })
            })
            .catch(error => setErrorMessage(error.message))
    }, [])

    useEffect(() => {
        trends.result.score ? open() : close()
        console.log(trends.result.score ? 'opened' : 'closed')
    }, [trends.result.score, open, close])
    
    const loadNextTrendle = async () => {
        try {
            const newWord = await wordsService.getWord()
            trendsDispatch({ type: 'SET_WORD', payload: newWord.data })

            const emptyResult = {
                score: null,
                globalAverage: null,
                globalAttempts: null
            }
            trendsDispatch({ type: 'SET_RESULT', payload: emptyResult })
            trendsDispatch({ type: 'SET_DATA_URL', payload: null })
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

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
                <ToolIconButton label="Next trendle" onClick={loadNextTrendle} icon={<IoIosArrowForward />} tooltip />
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