import { Alert, Text, Group } from '@mantine/core'
import { MdErrorOutline } from 'react-icons/md'
import { useErrorValue } from '../contexts/ErrorContextHooks'

const ErrorAlert = () => {
    const error = useErrorValue()

    if (error.errorQueue.length === 0) return null

    return (
        <Group pos='absolute' top='4rem' my='0.7rem'>
            {
                error.errorQueue.map(error => (
                    <Alert
                        variant="light"
                        color="red"
                        title="Oops!"
                        icon={<MdErrorOutline size="1.5em" />}
                        key={Math.random()}
                    >
                        <Text fw={500} size="sm">{error}</Text>
                    </Alert>
                    )
                )
            }
        </Group>
    )
}

export default ErrorAlert