import { useContext } from 'react'

import TrendsContext from './TrendsContext'

export const useTrends = () => {
    const trendsAndDispatch = useContext(TrendsContext)
    return trendsAndDispatch
}

export const useTrendsValue = () => {
    const trendsAndDispatch = useContext(TrendsContext)
    return trendsAndDispatch[0]
}

export const useTrendsDispatch = () => {
    const trendsAndDispatch = useContext(TrendsContext)
    return trendsAndDispatch[1]
}