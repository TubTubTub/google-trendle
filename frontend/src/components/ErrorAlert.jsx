import { useEffect } from 'react'
import { Alert, Text, List } from '@mantine/core'
import { MdErrorOutline } from 'react-icons/md'
import { useError } from '../contexts/ErrorContextHooks'

const ErrorAlert = () => {
    const [error, errorDispatch] = useError()
    
    useEffect(() => {
        if (error.errorQueue.length !== 0) {
            setTimeout(() => errorDispatch({ type: 'POP_ERROR_QUEUE' }), 3000)
        }
    }, [error, errorDispatch])

    if (error.errorQueue.length === 0) return null

    return (
        <Alert
            variant="light"
            color="red"
            title="Oops!"
            icon={<MdErrorOutline size="1.5em" />}
            style={{ position: 'absolute', top: '70px', padding: 12}}
        >
            <List>
                {
                    error.errorQueue.map(error =>
                        <List.Item key={Math.random()}>
                            <Text fw={500} size="sm">{error}</Text>
                        </List.Item>
                    )
                }
            </List>
        </Alert>
    )
}

export default ErrorAlert