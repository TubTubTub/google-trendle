import { useState, useEffect } from 'react'
import { Text, Title, Skeleton, Badge, Divider, ScrollArea, Group, Stack } from '@mantine/core'

import LeaderboardList from './LeaderboardList'
import LeaderboardSVG from '../../assets/leaderboard.svg?react'
import statisticsService from '../../services/statistics'

import { useProfile } from '../../contexts/ProfileContextHooks'

const Rankings = () => {
    const [rankings, setRankings] = useState([])
    const [profile, profileDispatch] = useProfile()

    useEffect(() => {
        statisticsService.getRankings(0)
            .then(result => setRankings(result))
        statisticsService.getUserStatistics()
            .then(result => profileDispatch({ type: 'SET_STATISTICS', payload: result }))
    }, [profileDispatch])

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

            {profile.profile ? 
            <Group py="sm" px="xl" mx="xs" gap="0.2em">
                <Text fw={500} ta="left">{`${profile.statistics.rank}.`}</Text>
                <Badge mx="xs">{profile.statistics.averageScore}</Badge>
                <Text fw={500} ta="left">{profile.profile.name}</Text>
            </Group>
            :
            <Text ta="center" fw={500} py="sm">Sign in to save statistics!</Text>}
        </Stack>
    )
}

export default Rankings