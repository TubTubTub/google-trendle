import { useEffect } from 'react'
import { Title, ScrollArea, Group, Stack } from '@mantine/core'

import HistoryList from './HistoryList'
import HistorySVG from '../../assets/history.svg?react'
import statisticsService from '../../services/statistics'
import { useHistoryDispatch } from '../../contexts/HistoryContextHooks'

const History = () => {
    const historyDispatch = useHistoryDispatch()

    useEffect(() => {
        statisticsService.getHistory()
            .then(result => historyDispatch({ type: 'SET_HISTORY', payload: result }))
    }, [historyDispatch])
    
    return (
        <Stack>
            <ScrollArea type="auto" scrollbars="y">
                <Group justify="center">
                    <Title ta="center" order={2} py="md">Game History</Title>
                    <HistorySVG style={{ width: '1.5em', height: '1.5em' }} />
                </Group>
                <HistoryList />
            </ScrollArea>
        </Stack>
    )
}

export default History