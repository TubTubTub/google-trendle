import { useState, useEffect } from 'react'
import { Center, Stack } from '@mantine/core'
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
    
    const loadNextTrendle = async () => {
        trendsDispatch({ type: 'SET_DATA_URL', payload: null })
        trendsDispatch({ type: 'SET_SCORE', payload: null })
        trendsDispatch({ type: 'SET_STATS', payload: null })
        
        try {
            const newWord = await wordsService.getWord()
            console.log(newWord,' AHAHHAAH')
            trendsDispatch({ type: 'SET_WORD', payload: newWord.data })
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Center style={{ height: "80vh", gap: '2em' }}>
            <ErrorAlert message={error} />
            <ToolIconButton label="Previous trendle" onClick={() => console.log('back')} icon={<IoIosArrowBack />} tooltip />
            <Stack>
                <GameSettings />
                <Game />
            </Stack>
            <ToolIconButton label="Next trendle" onClick={loadNextTrendle} icon={<IoIosArrowForward />} tooltip />
            <Result />
        </Center>
    )
}

export default GameMain