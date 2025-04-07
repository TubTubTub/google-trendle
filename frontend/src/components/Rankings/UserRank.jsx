import { Badge, Group, Text } from '@mantine/core'

const UserRank = ({ profile }) => {
    return (
        <Group px="lg" gap="0.2rem" h="3rem">
            <Text fw={500} ta="left">{`${profile.statistics.rank !== null ? profile.statistics.rank : 'N/A'}.`}</Text>
            <Badge mx="xs">{profile.statistics.averageScore !== null ? profile.statistics.averageScore : 'N/A'}</Badge>
            <Text fw={500} ta="left">{profile.profile.name}</Text>
        </Group>
    )
}

export default UserRank