import { useState, useEffect } from 'react'
import { Text, List, Skeleton, ThemeIcon, Badge, Title, Divider, Group, ScrollArea, rem } from '@mantine/core'
import rankingsService from '../services/rankings'
import { TbAwardFilled } from 'react-icons/tb'

const rankToColour = {
    0: 'gold',
    1: 'silver',
    2: 'darkgoldenrod'
}

const Leaderboard = () => {
    const [rankings, setRankings] = useState([])

    useEffect(() => {
        rankingsService.getAll()
            .then(result => setRankings(result))
    }, [])

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
        <>
        <ScrollArea type="auto" scrollbars="y">
            <Title ta="center" order={2} py="md">Leaderboard</Title>
            <List spacing="xs" px='sm' type="ordered" center>
                {rankings.slice(0, 3).map((ranking, index) => (
                    <List.Item key={index} icon={
                        <ThemeIcon variant="transparent" color={rankToColour[index]} radius="xl" size={24}>
                            <TbAwardFilled style={{ width: rem(24), height: rem(24), position: 'relative', left: '0.5em', top: '0.1em' }} />
                        </ThemeIcon>
                    }>
                        <Text fw={500} ta="center">{ranking[0]} <Badge mx="xs">{ranking[1]}</Badge></Text>
                    </List.Item>
                ))}
                {rankings.slice(3).map((ranking, index) => (
                    <List.Item key={index} px="lg">
                        <Text fw={500}>{ranking[0]} <Badge mx="xs">{ranking[1]}</Badge></Text>
                    </List.Item>
                ))}
            </List>
        </ScrollArea>
        <Divider />
        <Group py="sm" px="xl" mx="xs" gap="0.2em">
            <Text fw={500} ta="left">1.</Text>
            <Text fw={500} ta="left">TempUser <Badge mx="xs">100</Badge></Text>
        </Group>
        </>
    )
}

export default Leaderboard