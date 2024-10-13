import { Alert, Text } from '@mantine/core'
import { MdErrorOutline } from 'react-icons/md'

const ErrorAlert = ({ message }) => {
    if (!message) return null

    return (
        <Alert
            variant="light"
            color="red"
            title="Oops!"
            icon={<MdErrorOutline size="1.5em" />}
            style={{ position: 'absolute', top: '70px', padding: 12}}
        >
            <Text fw={500} size="sm">{message}</Text>
        </Alert>
    )
}

export default ErrorAlert