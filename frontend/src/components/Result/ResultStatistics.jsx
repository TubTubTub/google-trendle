import { useState, useEffect } from 'react'
import { Rating, Text, ThemeIcon, Stack, SimpleGrid } from '@mantine/core'

import { useTrendsValue } from '../../contexts/TrendsContextHooks'

import { FaEarthAmericas, FaUser } from 'react-icons/fa6'
import CustomPaper from '../CustomPaper'

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

const ResultStatistics = () => {
    const [debouncedScore, setDebouncedScore] = useState(null)
    const trends = useTrendsValue()

    useEffect(() => {
        if (trends.result.score !== null) {
            setDebouncedScore(trends.result.score)
        } else {
            setTimeout(() => setDebouncedScore(null), 200)
        }
    }, [trends.result.score])

    return (
        <Stack m="xs" align="center" style={{ transform: 'translateY(-10px)'}}>
        <Text
            ta="center"
            size="xl"
            fw={900}
            variant="gradient"
            gradient={scoreDescriptions[roundHalf((debouncedScore / 100) * 3)][1]}
        >
            {scoreDescriptions[roundHalf((debouncedScore / 100) * 3)][0]}
        </Text>

        <Rating value={(debouncedScore / 100) * 3} count={3} fractions={2} size="lg" readOnly />

        <CustomPaper p="xs" label="Your Score" tooltip style={{ alignSelf: 'stretch' }}>
            <Text
                style={{ fontSize: '1.5em'}}
                ta="center"
                size="xl"
                fw={900}
                variant="gradient"
                gradient={scoreDescriptions[roundHalf((debouncedScore / 100) * 3)][1]}
            >
                {debouncedScore}
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

    </Stack>
    )
}

export default ResultStatistics