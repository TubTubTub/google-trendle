import { Center, Stack } from '@mantine/core'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { ToolIconButton } from './Buttons'
import Game from './Game'
import GameSettings from './GameSettings'
import Result from './Result'

import { useTrends } from '../contexts/TrendsContextHooks'

const GameMain = () => {
    const [trends, trendsDispatch] = useTrends()
    const loadNextTrendle = () => {
        trendsDispatch({ type: 'SET_DATA_URL', payload: null })
        trendsDispatch({ type: 'SET_SCORE', payload: null })
        trendsDispatch({ type: 'SET_STATS', payload: null })
    }
    return (
        <Center style={{ height: "80vh", gap: '2em' }}>
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