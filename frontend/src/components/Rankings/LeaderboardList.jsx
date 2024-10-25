import { Text, ThemeIcon, Badge, List, Group, rem } from '@mantine/core'
import { TbAwardFilled } from 'react-icons/tb'

const rankToColour = {
    0: 'gold',
    1: 'silver',
    2: 'darkgoldenrod'
}

const LeaderboardList = ({ rankings }) => {
    return (
        <List spacing="xs" px='sm' type="ordered" center>
            {rankings.slice(0, 3).map((ranking, index) => (
                <List.Item key={index} icon={
                    <ThemeIcon variant="transparent" color={rankToColour[index]} radius="xl" size={24}>
                        <TbAwardFilled style={{ width: rem(24), height: rem(24), position: 'relative', left: '0.5em', top: '0.1em' }} />
                    </ThemeIcon>
                }>
                    <Group gap="0.2em">
                        <Badge mx="xs" color={rankToColour[index]}>{ranking[1]}</Badge><Text fw={500} ta="center">{ranking[0]}</Text>
                    </Group>
                </List.Item>
            ))}
            {rankings.slice(3).map((ranking, index) => (
                <List.Item key={index} px="lg">
                    <Group gap="0.2em">
                        <Badge mx="xs">{ranking[1]}</Badge><Text fw={500}>{ranking[0]}</Text>
                    </Group>
                </List.Item>
            ))}
        </List>
    )
}

export default LeaderboardList