import { Paper, Rating } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTrendsValue } from '../contexts/TrendsContextHooks'

const Result = () => {
    const [resultOpened, resultHandler] = useDisclosure(true)
    const trends = useTrendsValue()

    const element = (
        <Paper shadow="xs" radius="md" p="xl" m="xl">
            dissfndfnssndsfnsdkfsn
            <Rating value={trends.score} count={5} readOnly />
        </Paper>
    )

    return (
        <div>
            {trends.score ? element : null}
        </div>
    )
}

export default Result