import { useContext } from 'react'
import CanvasContext from './CanvasContext'

export const useCanvas = () => {
    const errorAndDispatch = useContext(CanvasContext)
    return errorAndDispatch
}

export const useCanvasValue = () => {
    const errorAndDispatch = useContext(CanvasContext)
    return errorAndDispatch[0].canvasRef
}

export const useCanvasDispatch = () => {
    const errorAndDispatch = useContext(CanvasContext)
    return errorAndDispatch[1]
}