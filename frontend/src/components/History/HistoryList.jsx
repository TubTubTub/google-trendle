import { Text, Accordion, Group, Skeleton } from '@mantine/core'
import { useHistoryValue } from '../../contexts/HistoryContextHooks'
import CustomPaper from '../CustomPaper'

const HistoryList = () => {
    const { history } = useHistoryValue()

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
        <Accordion>
            {history.map((game, index) => (
                <Accordion.Item key={index} value={index.toString()}>
                    <Accordion.Control>{game.word}</Accordion.Control>
                    <Accordion.Panel>
                        <Group>
                            <CustomPaper p="xs" label="Word" tooltip style={{ flexGrow: 1 }}>
                                <Text ta="center" size="sm" fw={500}>{game.word}</Text>
                            </CustomPaper>
                            <CustomPaper p="xs" label="Your score" tooltip style={{ minWidth: '2.5em' }}>
                                <Text ta="center" size="sm" fw={400}>{game.score}</Text>
                            </CustomPaper>
                            <CustomPaper p="xs" label="Attempted date" tooltip>
                                <Text ta="center" size="sm" fw={400}>{game.date}</Text>
                            </CustomPaper>
                        </Group>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default HistoryList