import { useState, useEffect } from 'react'
import { Text, Title, Divider, ScrollArea, Group, Stack, Center } from '@mantine/core'

import { useAddError } from '../../hooks/useAddError'
import { useProfile } from '../../contexts/ProfileContextHooks'
import statisticsService from '../../services/statistics'

import LeaderboardSVG from '../../assets/leaderboard.svg?react'
import LeaderboardList from './LeaderboardList'
import LoadingList from '../LoadingList'
import PageTurner from '../PageTurner'
import UserRank from './UserRank'

const RANKS_PER_PAGE = 50

const Rankings = () => {
    const [rankings, setRankings] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [profile, profileDispatch] = useProfile()
    const addError = useAddError()

    useEffect(() => {
        statisticsService.getRankings(pageNumber, RANKS_PER_PAGE)
            .then(result => {
                setRankings(result.rankings)
                setMaxPage(result.page_count)
            })
            .catch(error => {
                addError(`${error.message}: Failed to load rankings!`)
            })
    }, [pageNumber, addError])

    useEffect(() => {
        if (profile.profile) {
            statisticsService.getUserStatistics()
                .then(result => profileDispatch({ type: 'SET_STATISTICS', payload: result }))
        }
    }, [profile.profile, profileDispatch])

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

            <PageTurner pageNumber={pageNumber} setPageNumber={setPageNumber} maxPage={maxPage} />

            <Divider />

            {
            profile.profile ?
            <UserRank profile={profile} />
            :
            <Center h="3rem">
                <Text ta="center" fw={500}>Sign in to save statistics!</Text>
            </Center>
            }
        </Stack>
    )
}

export default Rankings