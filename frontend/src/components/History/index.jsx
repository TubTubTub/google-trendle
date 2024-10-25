import { useState, useEffect } from 'react'
import { Text, Title, Skeleton, Badge, Divider, ScrollArea, Group, Stack } from '@mantine/core'

import HistoryList from './HistoryList'
import HistorySVG from '../../assets/history.svg?react'
import historyService from '../../services/history'

const History = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        historyService.getAll()
            .then(result => setHistory(result))
    }, [])

    if (history.length === 0) {
        return (
            <>
                {Array(20).fill(0).map((_, index) => (
                    <Skeleton key={index} w="93%" h='5vh' mx="sm" mt="md" animate={true} />
                ))}
            </>
        )
    }
    
    return (
        <Stack>
            <ScrollArea type="auto" scrollbars="y">
                <Group justify="center">
                    <Title ta="center" order={2} py="md">Game History</Title>
                    <HistorySVG style={{ width: '1.5em', height: '1.5em' }} />
                </Group>
                <HistoryList history={history} />
            </ScrollArea>
        </Stack>
    )
}

export default History