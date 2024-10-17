import { Group, SegmentedControl, Slider, Text, Paper, useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { useTrends } from '../contexts/TrendsContextHooks'

const getTimeframeDisplay = (number, size) => {
    let plural = ''
    if (number > 1) plural = 's'

    let sizeWord = ''
    if (size === 'm') sizeWord = 'Month'
    else if (size === 'y') sizeWord = 'Year'

    return `Past ${number} ${sizeWord}${plural}`
}

const GameConfig = () => {
    const [trends, trendsDispatch] = useTrends()
    const theme = useMantineTheme()
    const { colorScheme, _ } = useMantineColorScheme()

    const setTimeframeSize = (value) => trendsDispatch({ type: 'SET_TIMEFRAME_SIZE', payload: value })
    const setTimeframeValue = (value) => trendsDispatch({ type: 'SET_TIMEFRAME_VALUE', payload: value })

    return (
        <Group align='stretch'>
            <Paper
                style={{
                    alignContent: 'center',
                    backgroundColor: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
                }}
                p="md"
            >
                <Text fw={500} ta="center">
                        {getTimeframeDisplay(trends.timeframe.match(/\d+/), trends.timeframe.at(-1))}
                </Text>
            </Paper>

            <SegmentedControl
                orientation="vertical"
                value={trends.timeframe.at(-1)}
                onChange={setTimeframeSize}
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
                onChangeEnd={setTimeframeValue}
                size="lg"
                style={{ flexGrow: 1, alignSelf: 'center' }}
            />
        </Group>
    )
}

export default GameConfig