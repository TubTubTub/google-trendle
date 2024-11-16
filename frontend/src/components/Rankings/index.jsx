import { useState, useEffect } from 'react'
import { Text, Title, Skeleton, Badge, Divider, ScrollArea, Group, Stack } from '@mantine/core'

import LeaderboardList from './LeaderboardList'
import LeaderboardSVG from '../../assets/leaderboard.svg?react'
import statisticsService from '../../services/statistics'

const Rankings = () => {
    const [rankings, setRankings] = useState([])

    useEffect(() => {
        statisticsService.getRankings(0)
            .then(result => setRankings(result))
    }, [])

    if (rankings.length === 0) {
        return (
            <>
                {Array(20).fill(0).map((_, index) => (
                    <Skeleton key={index} w="93%" h='5vh' mx="sm" mt="md" animate={true} />
                ))}
            </>
        )
    }
    
    return (
        <Stack justify="space-between" gap={0}>
            <ScrollArea type="auto" scrollbars="y" style={{ height: document.documentElement.clientHeight - 115}}>
                <Group justify="center">
                    <LeaderboardSVG style={{ width: '1.5em', height: '1.5em' }}/>
                    <Title ta="center" order={2} py="md">Leaderboard</Title>
                </Group>
                <LeaderboardList rankings={rankings} />
            </ScrollArea>
            
            <Divider />

            <Group py="md" px="xl" mx="xs" gap="0.2em">
                <Text fw={400} ta="left">1.</Text>
                <Badge mx="xs">100</Badge>
                <Text fw={500} ta="left">TempUser </Text>
            </Group>
        </Stack>
    )
}

export default Rankings