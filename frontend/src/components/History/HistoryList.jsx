import { Accordion, Group, Text } from '@mantine/core'

import CustomPaper from '../CustomPaper'

const HistoryList = ({ history }) => {
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
                            <CustomPaper p="xs" label="Score" tooltip style={{ minWidth: '2.5em' }}>
                                <Text ta="center" size="sm" fw={400}>{game.score}</Text>
                            </CustomPaper>
                            <CustomPaper p="xs" label="Date attempted" tooltip>
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