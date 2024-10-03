import { Modal, Title, Text, Kbd } from '@mantine/core'

const Help = ({ opened, onClose }) => {

    return (
        <Modal opened={opened} onClose={onClose} title="Help screen" centered size="lg">
            <Title order={3}>Keyboard Shortcuts</Title>
            <hr/>
            <Text size="lg" py="0.3em"><Kbd size="lg">Cmd</Kbd> + <Kbd size="lg">Z</Kbd> to undo stroke</Text>
            <Text size="lg" py="0.3em"><Kbd size="lg">Cmd</Kbd> + <Kbd size="lg">Shift</Kbd> + <Kbd>Z</Kbd> to redo stroke</Text>
            <Text size="lg" py="0.3em"><Kbd size="lg">Cmd</Kbd> + <Kbd size="lg">R</Kbd> to clear canvas</Text>
            <Text size="lg" py="0.3em"><Kbd size="lg">Enter</Kbd> to confirm guess</Text>
        </Modal>
    )
}

export default Help