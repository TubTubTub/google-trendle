import { useCallback, useEffect, useState } from 'react'
import { AppShell, Center, Group, ScrollArea, Text, Title } from '@mantine/core'
import { HiOutlineRefresh } from 'react-icons/hi'

import HistoryList from './HistoryList'

import { ToolIconButton } from '../Buttons'
import { useAddError } from '../../hooks/useAddError'
import { useProfileValue } from '../../contexts/ProfileContextHooks'
import statisticsService from '../../services/statistics'
import HistorySVG from '../../assets/history.svg?react'
import PageTurner from '../PageTurner'
import LoadingList from '../LoadingList'

const GAMES_PER_PAGE = 5

const History = () => {
    const [history, setHistory] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const profile = useProfileValue()
    const addError = useAddError()

    const refreshHistory = useCallback(async () => {
        setHistory(null)

        if (profile.profile) {
            const result = await statisticsService.getHistory(pageNumber, GAMES_PER_PAGE, profile.profile.id)

            if (result.history) {
                setHistory(result.history)
                setMaxPage(result.page_count)
                return
            } else {
                addError('Error loading history!')
            }
        }

        setHistory([])
        setPageNumber(1)
        setMaxPage(1)
    }, [profile.profile, pageNumber, addError])

    useEffect(() => {
        refreshHistory()
    }, [refreshHistory])

    if (history === null) return <LoadingList />

    if (history.length === 0) {
        const displayText = profile.profile ? "No games found!" : "Sign in to view game history!"
        return (
            <Center h='100%'>
                <Text fw={500}>{displayText}</Text>
            </Center>
        )
    }

    return (
        <>
        <AppShell.Section>
            <Group h="4rem" justify="center">
                <HistorySVG style={{ width: '1.5rem', height: '1.5rem' }} />
                <Title order={2}>Game History</Title>
                <ToolIconButton onClick={refreshHistory} label="Refresh history" icon={<HiOutlineRefresh size="1.5rem" />} tooltip={true} />
            </Group>
        </AppShell.Section>

        <AppShell.Section component={ScrollArea} grow={true}>
            <HistoryList history={history} />
        </AppShell.Section>

        <AppShell.Section>
            <PageTurner pageNumber={pageNumber} setPageNumber={setPageNumber} maxPage={maxPage} />
        </AppShell.Section>
        </>
    )
}

export default History