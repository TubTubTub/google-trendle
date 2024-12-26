import { Text, Badge, Group } from '@mantine/core'

const UserRank = ({ profile }) => {
    return (
        <Group px="lg" gap="0.2rem" h="4rem">
            <Text fw={500} ta="left">{`${profile.statistics.rank}.`}</Text>
            <Badge mx="xs">{profile.statistics.averageScore}</Badge>
            <Text fw={500} ta="left">{profile.profile.name}</Text>
        </Group>
    )
}

export default UserRank