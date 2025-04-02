import { useRef, useEffect, useState } from 'react'
import { Stack, useMantineColorScheme } from '@mantine/core'
import { ReactSketchCanvas } from 'react-sketch-canvas'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'
import { useCanvasDispatch } from '../../contexts/CanvasContextHooks'

import backgroundSVG from '../../assets/background.svg'
import AnswerGraph from '../Result/AnswerGraph'
import XAxis from './XAxis'

const Canvas = () => {
    const { colorScheme, _ } = useMantineColorScheme()
    const canvasDispatch = useCanvasDispatch()
    const trends = useTrendsValue()
    const canvasRef = useRef()
    const containerRef = useRef()
    const axisRef = useRef()
    const [containerSize, setContainerSize] = useState([0, 0])

    useEffect(() => {
        canvasDispatch({ type: 'SET_REF', payload: canvasRef })
    }, [canvasDispatch])

    useEffect(() => {
        if (containerRef.current && axisRef.current) {
            const containerSize = containerRef.current.getBoundingClientRect()
            const axisSize = axisRef.current.getBoundingClientRect()
            setContainerSize([containerSize.width, containerSize.height - axisSize.height])
        }
    }, [containerRef.current?.clientWidth, containerRef.current?.clientHeight])

    return (
        <Stack h="100%" w='calc(100% - 6rem)' gap={0} ref={containerRef}>
            <ReactSketchCanvas
                width='100%'
                height='100%'
                strokeWidth={4}
                strokeColor={colorScheme === 'dark' ? 'white' : 'rgb(10, 10, 10)' }
                canvasColor='rgb(0, 0, 0, 0)'
                ref={canvasRef}
            />

            <AnswerGraph width={containerSize[0]} height={containerSize[1]} />

            <XAxis size={trends.timeframe.at(-1)} number={Number(trends.timeframe.match(/\d+/)) + 1} axisRef={axisRef} />
        </Stack>
    )
}

export default Canvas