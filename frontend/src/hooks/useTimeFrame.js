import { useTrends } from '../contexts/TrendsContextHooks'

const useTimeFrame = () => {
    const [trends, trendsDispatch] = useTrends()

    const getDisplay = () => {
        const number = trends.timeframe.match(/\d+/)
        const size = trends.timeframe.at(-1)

        const plural = number > 1 ? 's' : ''
        const sizeWord = size === 'm' ? 'Month' : 'Year'
    
        return `Past ${number} ${sizeWord}${plural}`
    }

    const setSize = (value) => trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: value })
    const setValue = (value) => trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: value })

    return [getDisplay, setSize, setValue]
}

export default useTimeFrame