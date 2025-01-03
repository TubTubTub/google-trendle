import { useRef, useEffect } from 'react'
import { Stack, useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'
import { useCanvasDispatch } from '../../contexts/CanvasContextHooks'

import backgroundSVG from '../../assets/background.svg'
import YAxis from './YAxis'
import XAxis from './XAxis'

const Canvas = () => {
    const { colorScheme, _ } = useMantineColorScheme()
    const canvasDispatch = useCanvasDispatch()
    const trends = useTrendsValue()
    const theme = useMantineTheme()
    const ref = useRef()

    useEffect(() => {
        canvasDispatch({ type: 'SET_REF', payload: ref })
    }, [canvasDispatch])

    return (
        <Stack h="100%" w='calc(100% - 6rem)' gap={0}>
            {/* <YAxis /> */}
            <ReactSketchCanvas
                width='100%'
                height='100%'
                strokeWidth={4}
                strokeColor={colorScheme === 'dark' ? 'white' : 'rgb(10, 10, 10)' }
                canvasColor={colorScheme === 'dark' ? theme.colors.dark[4] : 'green' }
                backgroundImage={backgroundSVG}
                ref={ref}
            />

            <XAxis size={trends.timeframe.at(-1)} number={Number(trends.timeframe.match(/\d+/)) + 1} />
        </Stack>
    )
}

export default Canvas