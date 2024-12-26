import { useRef } from 'react'
import { Stack, useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'

import backgroundSVG from '../../assets/background.svg'
import YAxis from './YAxis'
import XAxis from './XAxis'

const Canvas = ({ canvas }) => {
    const trends = useTrendsValue()
    const { colorScheme, _ } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Stack h="100%" gap={0} style={{ flexGrow: 1 }}>
            <YAxis />

            <ReactSketchCanvas
                width='100%'
                height='100%'
                strokeWidth={4}
                strokeColor={colorScheme === 'dark' ? 'white' : 'black' }
                canvasColor={colorScheme === 'dark' ? theme.colors.dark[4] : 'white' }
                ref={canvas}
            />

            <XAxis size={trends.timeframe.at(-1)} number={Number(trends.timeframe.match(/\d+/)) + 1} />
        </Stack>
    )
}

// ADD BACKGROUND IMAGE CAUSE CANNOT EXPORT PROPERLY WITH backgroundImage={backgroundSVG}

export default Canvas