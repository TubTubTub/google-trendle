import { useRef } from 'react'
import { Stack, useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'

import backgroundSVG from '../../assets/background.svg'
import YAxis from './YAxis'
import XAxis from './XAxis'
import CanvasControl from './CanvasControl'

const Game = () => {
    const trends = useTrendsValue()
    const { colorScheme, _ } = useMantineColorScheme()
    const theme = useMantineTheme()
    const canvas = useRef()

    return (
        <Stack gap={0}>
            <YAxis />

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
            <CanvasControl canvas={canvas} />
        </Stack>
    )
}

export default Game