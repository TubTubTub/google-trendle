import { Paper, Rating, Text, CloseButton, Stack, Flex } from '@mantine/core'
import { useTrendsValue } from '../contexts/TrendsContextHooks'

const scoreDescriptions = {
    '0': `You're shit!`,
    '0.5': 'Oh no!',
    '1': 'Could be better...',
    '1.5': 'Not bad!',
    '2': 'Damn!',
    '2.5': 'Great job!',
    '3': 'Touch grass!',
}

const roundHalf = (num) => {
    return (Math.round(num * 2)) / 2
}

const Result = ({ onClose, style }) => {
    const trends = useTrendsValue()

    return (
        <Paper shadow="md" radius="sm" p="md" h={400} style={style}>
            <Flex justify="flex-end">
                <CloseButton onClick={() => onClose()}/>
            </Flex>

            <Stack m="xl">
                <Rating value={(trends.result.score / 100) * 3} count={3} fractions={2} size="lg" readOnly />
                <Text ta="center">{scoreDescriptions[roundHalf((trends.result.score / 100) * 3)]}</Text>
                <Text>Average score: {trends.result.globalAverage}</Text>
            </Stack>
        </Paper>
    )
}

export default Result