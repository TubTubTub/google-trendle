import { useState, useEffect } from 'react'
import { Text, Title, Divider, ScrollArea, Group, Stack, Center } from '@mantine/core'

import { useProfile } from '../../contexts/ProfileContextHooks'
import statisticsService from '../../services/statistics'

import LeaderboardSVG from '../../assets/leaderboard.svg?react'
import LeaderboardList from './LeaderboardList'
import LoadingList from '../LoadingList'
import UserRank from './UserRank'

const Rankings = () => {
    const [rankings, setRankings] = useState([])
    const [profile, profileDispatch] = useProfile()

    useEffect(() => {
        statisticsService.getRankings(0)
            .then(result => setRankings(result))
        statisticsService.getUserStatistics()
            .then(result => profileDispatch({ type: 'SET_STATISTICS', payload: result }))
    }, [profileDispatch])

    if (rankings.length === 0) return <LoadingList />
    
    return (
        <Stack h="100%" gap={0}>
            <Group h="4rem" justify="center">
                <LeaderboardSVG style={{ width: '1.5rem', height: '1.5rem' }}/>
                <Title order={2}>Leaderboard</Title>
            </Group>
            
            <ScrollArea type="auto" scrollbars="y" style={{ flexGrow: 1 }}>
                <LeaderboardList rankings={rankings} />
            </ScrollArea>
            
            <Divider />

            {
            profile.profile ?
            <UserRank profile={profile} />
            :
            <Center h="4rem">
                <Text ta="center" fw={500}>Sign in to save statistics!</Text>
            </Center>
            }
        </Stack>
    )
}

export default Rankings