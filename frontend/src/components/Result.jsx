import { useEffect } from 'react'
import { Paper, Rating, Text, CloseButton, Stack, Flex, Transition } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTrendsValue } from '../contexts/TrendsContextHooks'

const ratingFeedback = {
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

const Result = () => {
    const [resultOpened, { open, close }] = useDisclosure(false)
    const trends = useTrendsValue()

    useEffect(() => {
        trends.score ? open() : close()
    }, [trends.score, open, close])

    return (
        <Transition
            mounted={resultOpened}
            transition="slide-right"
            duration={200}
            timingFunction="ease"
            keepMounted
        >
            {(transitionStyle) => (
                <Paper shadow="md" radius="sm" p="md" h={400} style={{ ...transitionStyle, zIndex: 1 }}>
                    <Flex justify="flex-end">
                        <CloseButton onClick={() => close()}/>
                    </Flex>

                    <Stack m="xl">
                        <Rating value={trends.score * 3} count={3} fractions={2} size="lg" readOnly />
                        <Text ta="center">{ratingFeedback[roundHalf(trends.score * 3)]}</Text>
                    </Stack>
                </Paper>
            )}
        </Transition>
    )
}

export default Result