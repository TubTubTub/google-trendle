import { useState, useEffect, useCallback } from 'react'
import { Title, ScrollArea, Group, Stack, Center, Text } from '@mantine/core'
import { HiOutlineRefresh } from 'react-icons/hi'
import { ToolIconButton } from '../Buttons'

import { useProfileValue } from '../../contexts/ProfileContextHooks'
import statisticsService from '../../services/statistics'

import HistorySVG from '../../assets/history.svg?react'
import HistoryList from './HistoryList'
import PageTurner from '../PageTurner'

const GAMES_PER_PAGE = 5

const History = () => {
    const [history, setHistory] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const profile = useProfileValue()

    const refreshHistory = useCallback(async () => {
        if (profile.profile) {
            const result = await statisticsService.getHistory(pageNumber, GAMES_PER_PAGE)
            setHistory(result.history)
            setMaxPage(result.page_count)
        } else {
            setHistory([])
            setPageNumber(1)
            setMaxPage(1)
        }

    }, [profile.profile, pageNumber])

    useEffect(() => {
        refreshHistory()
    }, [refreshHistory])
    
    if (history.length === 0) {
        const displayText = profile.profile ? "No games found!" : "Sign in to view game history!"
        return (
            <Center h='100%'>
                <Text fw={500}>{displayText}</Text>
            </Center>
        )
    }
    
    return (
        <Stack h="100%" gap={0}>
            <Group h="4rem" justify="center">
                <HistorySVG style={{ width: '1.5rem', height: '1.5rem' }} />
                <Title order={2}>Game History</Title>
                <ToolIconButton onClick={refreshHistory} label="Refresh history" icon={<HiOutlineRefresh size="1.5rem" />} tooltip={true} />
            </Group>
            
            <ScrollArea type="auto" scrollbars="y" style={{ flexGrow: 1 }}>
                <HistoryList history={history} />
            </ScrollArea>

            <PageTurner pageNumber={pageNumber} setPageNumber={setPageNumber} maxPage={maxPage} />
        </Stack>
    )
}

export default History