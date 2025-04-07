import { Badge, Group, List, rem, Text, ThemeIcon } from '@mantine/core'
import { TbAwardFilled } from 'react-icons/tb'

const rankToColour = {
    0: '#EA4335',
    1: '#4285F4',
    2: '#FBBC04',
    3: '#9AA0A6'
}

const round = (num, dp) => {
    return Math.floor(num * 10 ** dp) / 10 ** dp
}

const LeaderboardList = ({ rankings }) => {
    return (
        <List spacing="xs" px="sm" type="ordered" center>
            {rankings.slice(0, 3).map((user, index) => (
                <List.Item key={index} icon={
                    <ThemeIcon variant="transparent" color={rankToColour[index]} radius="xl" size={24}>
                        <TbAwardFilled style={{ width: rem(24), height: rem(24), position: 'relative', left: '0.5em', top: '0.1em' }} />
                    </ThemeIcon>
                }>
                    <Group gap="0.2em">
                        <Badge mx="xs" color={rankToColour[index]}>{round(user.averageScore, 1)}</Badge><Text fw={500} ta="center">{user.name}</Text>
                    </Group>
                </List.Item>
            ))}
            {rankings.slice(3).map((user, index) => (
                <List.Item key={index} px="lg">
                    <Group gap="0.2rem">
                        <Badge mx="xs" color={rankToColour[3]}>{round(user.averageScore, 1)}</Badge><Text fw={500}>{user.name}</Text>
                    </Group>
                </List.Item>
            ))}
        </List>
    )
}

export default LeaderboardList