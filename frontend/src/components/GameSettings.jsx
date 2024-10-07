import { SegmentedControl, Slider, Text } from '@mantine/core'
import { useTrends } from '../contexts/TrendsContextHooks'

const GameSettings = () => {
    const [trends, dispatch] = useTrends()

    const setTimeframeSize = (value) => dispatch({ type: 'SET_TIMEFRAME_SIZE', payload: value })
    const setTimeframeValue = (value) => dispatch({ type: 'SET_TIMEFRAME_VALUE', payload: value })

    return (
        <div>
            <SegmentedControl
                orientation="vertical"
                onChange={setTimeframeSize}
                data={[
                    { label: 'Months',value:'m' },
                    { label: 'Years', value:'y' },
                ]}
            />
            <Slider
                defaultValue={6}
                max={12}
                label={(value) => value}
                step={1}
                onChangeEnd={setTimeframeValue}
                size="lg"
            />
            <Text>{trends.timeframe}</Text>
        </div>
    )
}

export default GameSettings