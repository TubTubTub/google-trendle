import { useState, useEffect } from 'react'
import { Text, Title, Divider, ScrollArea, Group, Stack } from '@mantine/core'

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
        <Stack>
            <Group justify="center">
                <LeaderboardSVG style={{ width: '1.5em', height: '1.5em' }}/>
                <Title ta="center" order={2} py="md">Leaderboard</Title>
            </Group>
            
            <ScrollArea type="auto" scrollbars="y" style={{ height: '76.5vh'}}>
                <LeaderboardList rankings={rankings} />
            </ScrollArea>
            
            <Divider />

            {profile.profile ? <UserRank profile={profile} /> : <Text ta="center" fw={500}>Sign in to save statistics!</Text>}
        </Stack>
    )
}

export default Rankings