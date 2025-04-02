import { Modal, Title, Text, Kbd, Highlight } from '@mantine/core'

const Help = ({ opened, onClose }) => {
    return (
        <Modal opened={opened} onClose={onClose} withCloseButton={false} centered size="lg">
            <Title order={2}>What is Google Trendle?</Title>
            <hr/>
            <Highlight
                highlight={['Google Trendle']}
                highlightStyles={{
                    backgroundImage:
                    'linear-gradient(45deg, #EA4335, #4285F4)',
                    fontWeight: 900,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Google Trendle is a game based on guessing the popularity of words and terms. The aim is to draw a graph, representing the change in interest in that topic over time (based on number of Google searches for that topic), that is as close to the trend data taken from the official Google Trends as possible.
            </Highlight>
            <Text pb="sm">
                All graphs are standardised to fill the entire length of the X and Y axis.
            </Text>

            <Title order={3}>Keyboard Shortcuts</Title>
            <hr/>
            <Text size="lg" py="0.3em"><Kbd size="lg">Cmd</Kbd> + <Kbd size="lg">Z</Kbd> to undo stroke</Text>
            <Text size="lg" py="0.3em"><Kbd size="lg">Cmd</Kbd> + <Kbd size="lg">Shift</Kbd> + <Kbd size="lg">Z</Kbd> to redo stroke</Text>
            <Text size="lg" py="0.3em"><Kbd size="lg">Cmd</Kbd> + <Kbd size="lg">R</Kbd> to clear canvas</Text>
            <Text size="lg" py="0.3em"><Kbd size="lg">Enter</Kbd> to confirm guess</Text>
        </Modal>
    )
}

export default Help