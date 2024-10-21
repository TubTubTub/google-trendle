import { Paper, Rating, Text, CloseButton, ThemeIcon, Button, Stack, Flex, SimpleGrid, Transition } from '@mantine/core'
import { useTrendsValue } from '../contexts/TrendsContextHooks'
import { FaEarthAmericas, FaUser, FaArrowRightLong } from 'react-icons/fa6'
import CustomPaper from './CustomPaper'
import useNextTrendle from '../hooks/useNextTrendle'

const scoreDescriptions = {
    '0': [`You're shit!`, { from: 'red', to: 'pink', deg: 90 }],
    '0.5': ['Oh no!', { from: 'red', to: 'pink', deg: 90 }],
    '1': ['Could be better...', { from: 'grape', to: 'violet', deg: 90 }],
    '1.5': ['Not bad!', { from: 'indigo', to: 'teal', deg: 90 }],
    '2': ['Damn!', { from: 'teal', to: 'lime', deg: 90 }],
    '2.5': ['Great job!', { from: 'green', to: 'lime', deg: 90 }],
    '3': ['Touch grass!', { from: 'yellow', to: 'orange', deg: 90 }],
}

const roundHalf = (num) => {
    return (Math.round(num * 2)) / 2
}

const Result = ({ open, onClose }) => {
    const trends = useTrendsValue()
    const loadNextTrendle = useNextTrendle()

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

                    <Stack m="xs" align="center" style={{ transform: 'translateY(-10px)'}}>
                        <Text
                            ta="center"
                            size="xl"
                            fw={900}
                            variant="gradient"
                            gradient={scoreDescriptions[roundHalf((trends.result.score / 100) * 3)][1]}
                        >
                            {scoreDescriptions[roundHalf((trends.result.score / 100) * 3)][0]}
                        </Text>

                        <Rating value={(trends.result.score / 100) * 3} count={3} fractions={2} size="lg" readOnly />

                        <CustomPaper p="xs" label="Your Score" tooltip style={{ alignSelf: 'stretch' }}>
                            <Text
                                style={{ fontSize: '1.5em'}}
                                ta="center"
                                size="xl"
                                fw={900}
                                variant="gradient"
                                gradient={scoreDescriptions[roundHalf((trends.result.score / 100) * 3)][1]}
                            >
                                {trends.result.globalAttempts}
                            </Text>
                        </CustomPaper>
                        
                        <SimpleGrid cols={2}>
                            <ThemeIcon variant="transparent" color="gray" style={{ justifySelf: 'center' }}>
                                <FaEarthAmericas size="1.5em" />
                            </ThemeIcon>

                            <ThemeIcon variant="transparent" color="gray" style={{ justifySelf: 'center' }}>
                                <FaUser size="1.5em" />
                            </ThemeIcon>
                            
                            <CustomPaper label="Global Average Score" tooltip style={{ width: '4em', height: '4em' }}>
                                <Text ta="center" size="lg" fw={500}>{trends.result.globalAverage}</Text>
                            </CustomPaper>

                            <CustomPaper label="Global Attempts" tooltip style={{ width: '4em', height: '4em' }}>
                                <Text ta="center" size="lg" fw={500}>{trends.result.globalAttempts}</Text>
                            </CustomPaper>
                        </SimpleGrid>
                        <Button onClick={loadNextTrendle} rightSection={<FaArrowRightLong />}>
                            Next Trendle
                        </Button>

                    </Stack>
                </Paper>
            )}
        </Transition>
    )
}

export default Result