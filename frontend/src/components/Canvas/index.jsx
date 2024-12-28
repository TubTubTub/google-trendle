
import { useEffect, useState } from 'react'
import { Stack, useMantineTheme, useMantineColorScheme, Box } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import CanvasDraw from 'react-canvas-draw'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'

import backgroundSVG from '../../assets/background.svg'
import YAxis from './YAxis'
import XAxis from './XAxis'

const Canvas = ({ canvas }) => {
    const trends = useTrendsValue()
    const [size,setSize] = useState([1000, 500])
    const { colorScheme, _ } = useMantineColorScheme()
    const theme = useMantineTheme()

    useEffect(() => {
        const elem = document.getElementById("poop")
        if (elem) {
            console.log(elem.clientWidth, elem.clientHeight)
            setSize([elem.clientWidth, elem.clientWidth / 2])
        }
    }, [])

    return (
        <Stack id="parent" h="100%" gap={0} style={{ width: 'calc(100% - 6rem)', backgroundColor:'green' }}>
            <YAxis />

            <Box w='100%' h='100%' id="poop">
                {/* <ReactSketchCanvas
                    width={100}
                    height={70}
                    strokeWidth={4}
                    strokeColor={colorScheme === 'dark' ? 'white' : 'black' }
                    canvasColor={colorScheme === 'dark' ? theme.colors.dark[4] : 'white' }
                    ref={canvas}
                /> */}
                <CanvasDraw
                    canvasWidth={size[0]}
                    canvasHeight={size[0]/2}
                    ref={canvas}
                />
            </Box>

            <XAxis size={trends.timeframe.at(-1)} number={Number(trends.timeframe.match(/\d+/)) + 1} />
        </Stack>
    )
}

// ADD BACKGROUND IMAGE CAUSE CANNOT EXPORT PROPERLY WITH backgroundImage={backgroundSVG}

export default Canvas