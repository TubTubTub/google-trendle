import { createContext, useReducer } from 'react'

const canvasReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REF':
            return {
                canvasRef: action.payload
            }
        default:
            return state
    }
}

const CanvasContext = createContext()

const initialValues = {
    canvasRef: null
}

export const CanvasContextProvider = (props) => {
    const [canvas, canvasDispatch] = useReducer(canvasReducer, initialValues)

    return (
        <CanvasContext.Provider value={[canvas, canvasDispatch]}>
            {props.children}
        </CanvasContext.Provider>
    )
}

export default CanvasContext