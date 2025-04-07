import { useEffect, useState } from 'react'
import { AppShell, Center, Divider, Group, ScrollArea, Text, Title } from '@mantine/core'

import LeaderboardList from './LeaderboardList'
import UserRank from './UserRank'

import { useProfileValue } from '../../contexts/ProfileContextHooks'
import { useAddError } from '../../hooks/useAddError'
import statisticsService from '../../services/statistics'
import LeaderboardSVG from '../../assets/leaderboard.svg?react'
import LoadingList from '../LoadingList'
import PageTurner from '../PageTurner'

const RANKS_PER_PAGE = 50

const Rankings = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [rankings, setRankings] = useState(0)
    const [maxPage, setMaxPage] = useState(1)
    const profile = useProfileValue()
    const addError = useAddError()

    useEffect(() => {
        statisticsService.getRankings(pageNumber, RANKS_PER_PAGE)
            .then(result => {
                setRankings(result.rankings)
                setMaxPage(result.page_count)
            })
            .catch(error => {
                addError(`${error.message}: Failed to load rankings!`)
                setRankings(null)
            })
    }, [pageNumber, addError])

    if (rankings === 0) return <LoadingList />

    if (rankings === null) return (
        <Center h='100%'>
            <Text fw={500}>Rankings failed to load!</Text>
        </Center>
    )

    if (rankings.length === 0) return (
        <Center h='100%'>
            <Text fw={500}> No ranking entries!</Text>
        </Center>
    )

    return (
        <>
        <AppShell.Section>
            <Group h="4rem" justify="center">
                <LeaderboardSVG style={{ width: '1.5rem', height: '1.5rem' }}/>
                <Title order={2}>Leaderboard</Title>
            </Group>
        </AppShell.Section>

        <AppShell.Section component={ScrollArea} grow={true}>
            <LeaderboardList rankings={rankings} />
        </AppShell.Section>

        <AppShell.Section>
            <PageTurner pageNumber={pageNumber} setPageNumber={setPageNumber} maxPage={maxPage} />
        </AppShell.Section>

        <Divider />

        <AppShell.Section>
        {
        profile.profile ?
        <UserRank profile={profile} />
        :
        <Center h="3rem">
            <Text ta="center" fw={500}>Sign in to save statistics!</Text>
        </Center>
        }
        </AppShell.Section>
        </>
    )
}

export default Rankings