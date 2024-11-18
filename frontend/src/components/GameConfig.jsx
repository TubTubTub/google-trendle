import { Group, SegmentedControl, Slider, Text } from '@mantine/core'
import { useTrendsValue } from '../contexts/TrendsContextHooks'
import CustomPaper from './CustomPaper'
import useTimeFrame from '../hooks/useTimeFrame'

const GameConfig = () => {
    const [getDisplay, setSize, setValue] = useTimeFrame()
    const trends = useTrendsValue()

    return (
        <Group align='stretch'>
            <CustomPaper>
                <Text fw={500} ta="center">
                    {getDisplay()}
                </Text>
            </CustomPaper>

            <SegmentedControl
                orientation="vertical"
                value={trends.timeframe.at(-1)}
                onChange={setSize}
                data={[
                    { label: 'Months', value: 'm' },
                    { label: 'Years', value: 'y' },
                ]}
            />

            <Slider
                value={trends.timeframe.match(/\d+/)}
                min={1}
                max={12}
                label={(value) => value}
                step={1}
                onChange={setValue}
                size="lg"
                style={{ flexGrow: 1, alignSelf: 'center' }}
            />
        </Group>
    )
}

export default GameConfig