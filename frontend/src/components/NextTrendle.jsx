import { IoIosArrowForward } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import { useTrendsDispatch } from '../contexts/TrendsContextHooks'

import wordsService from '../services/words'
import trendsService from '../services/trends'

const NextTrendle = ({ setErrorMessage }) => {
    const trendsDispatch = useTrendsDispatch()

    const loadNextTrendle = async () => {
        try {
            const newWord = await wordsService.getWord(true)
            const yAxisLabels = await trendsService.getYAxisLabels(newWord, true)
            trendsDispatch({ type: 'SET_WORD', payload: newWord })
            trendsDispatch({ type: 'SET_Y_AXIS_LABELS', payload: yAxisLabels })

            const emptyResult = {
                score: null,
                globalAverage: null,
                globalAttempts: null
            }
            trendsDispatch({ type: 'SET_RESULT', payload: emptyResult })
            trendsDispatch({ type: 'SET_DATA_URL', payload: null })
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <ToolIconButton label="Next trendle" onClick={loadNextTrendle} icon={<IoIosArrowForward />} tooltip />
    )
}

export default NextTrendle