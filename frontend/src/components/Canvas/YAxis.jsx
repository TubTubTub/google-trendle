import { Text, Stack } from '@mantine/core'
import { useTrendsValue } from '../../contexts/TrendsContextHooks'

const YAxis = () => {
    const trends = useTrendsValue()
    return (
        <Stack pos='absolute' justify='space-evenly' h='60%'>
            <Text size="sm" fw={500} c="dimmed" pl='0.2rem'>{trends.yAxisLabels[0]}</Text>
            <Text size="sm" fw={500} c="dimmed" pl='0.2rem'>{trends.yAxisLabels[1]}</Text>
        </Stack>
    )
}

export default YAxis