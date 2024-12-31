
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
        <Stack id="parent" h="100%" gap={0} style={{ width: 'calc(100% - 6rem)' }}>
            {/* <YAxis /> PROBABLY DON'T NEED CAUSE WILL ALWAYS BE STANDARDISED FROM 0-100 */}

            <ReactSketchCanvas
                width='100%'
                height='100%'
                strokeWidth={4}
                strokeColor={colorScheme === 'dark' ? 'white' : 'rgb(10, 10, 10)' }
                canvasColor={colorScheme === 'dark' ? theme.colors.dark[4] : 'green' }
                backgroundImage={backgroundSVG}
                ref={canvas}
            />

            <XAxis size={trends.timeframe.at(-1)} number={Number(trends.timeframe.match(/\d+/)) + 1} />
        </Stack>
    )
}

export default Canvas