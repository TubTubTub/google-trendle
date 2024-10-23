import { useState, useEffect } from 'react'
import { Text, List, Skeleton } from '@mantine/core'
import rankingsService from '../services/rankings'

const Leaderboard = () => {
    const [rankings, setRankings] = useState([])

    useEffect(() => {
        rankingsService.getAll()
            .then(result => setRankings(result))
    }, [])

    if (rankings.length !== 0) {
        return (
            <>
                {Array(15).fill(0).map((_, index) => (
                    <Skeleton key={index} w="93%" h='5vh' mx="sm" mt="sm" animate={true} />
                ))}
            </>
        )
    }
    
    return (
        <List>
            {rankings.map((ranking, index) => (
                <List.Item key={index}>
                    <Text fw={500}>{ranking[0]} {ranking[1]}</Text>
                </List.Item>
            ))}
        </List>
    )
}

export default Leaderboard