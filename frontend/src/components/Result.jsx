import { Paper, Rating, Text, CloseButton, Stack, Flex, Transition } from '@mantine/core'
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

const Result = ({ open, onClose }) => {
    const trends = useTrendsValue()

    return (
        <Transition
            mounted={open}
            transition="slide-right"
            duration={200}
            timingFunction="ease"
            keepMounted
        >
            {(transitionStyle) => (
                <Paper shadow="md" radius="sm" p="md" h={400} style={{...transitionStyle, zIndex: 1, position: 'absolute', right: '24vw' }}>
                    <Flex justify="flex-end">
                        <CloseButton onClick={() => onClose()}/>
                    </Flex>

                    <Stack m="xl">
                        <Rating value={(trends.result.score / 100) * 3} count={3} fractions={2} size="lg" readOnly />
                        <Text ta="center">{scoreDescriptions[roundHalf((trends.result.score / 100) * 3)]}</Text>
                        <Text>Average score: {trends.result.globalAverage}</Text>
                    </Stack>
                </Paper>
            )}
        </Transition>
    )
}

export default Result