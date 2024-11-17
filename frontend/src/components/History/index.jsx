import { useEffect } from 'react'
import { Title, ScrollArea, Group, Stack } from '@mantine/core'

import HistoryList from './HistoryList'
import HistorySVG from '../../assets/history.svg?react'
import statisticsService from '../../services/statistics'
import { useHistoryDispatch } from '../../contexts/HistoryContextHooks'
import { ToolIconButton } from '../Buttons'


import { HiOutlineRefresh } from 'react-icons/hi'

const History = () => {
    const historyDispatch = useHistoryDispatch()

    useEffect(() => {
        refreshHistory()
    }, [])

    const refreshHistory = async () => {
        historyDispatch({ type: 'SET_HISTORY', payload: null })
        const history = await statisticsService.getHistory()
        historyDispatch({ type: 'SET_HISTORY', payload: history })
    }
    
    return (
        <Stack>
            <ScrollArea type="auto" scrollbars="y">
                <Group justify="center">
                    <HistorySVG style={{ width: '1.5em', height: '1.5em' }} />
                    <Title ta="center" order={2} py="md">Game History</Title>
                    <ToolIconButton onClick={refreshHistory} label="Refresh history" icon={<HiOutlineRefresh size="1.5em" />} tooltip={true} />
                </Group>
                <HistoryList />
            </ScrollArea>
        </Stack>
    )
}

export default History