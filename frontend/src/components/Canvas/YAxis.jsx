import { Text, Box } from '@mantine/core'
import { useTrendsValue } from '../../contexts/TrendsContextHooks'

const YAxis = () => {
    const trends = useTrendsValue()

    return (
        <Box>
            <Text size="sm" fw={500} c="dimmed" style={{ position: 'absolute', left: '3.8em', transform: 'translateY(+116px)' }}>{trends.yAxisLabels[0]}</Text>
            <Text size="sm" fw={500} c="dimmed" style={{ position: 'absolute', left: '3.8em', transform: 'translateY(+258px)' }}>{trends.yAxisLabels[1]}</Text>
        </Box>
    )
}

export default YAxis