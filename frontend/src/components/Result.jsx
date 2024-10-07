import { useState } from 'react'
import { Paper, Rating } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const Result = () => {
    const [resultOpened, resultHandler] = useDisclosure(true)
    const [score, setScore] = useState(3)

    return (
        <Paper shadow="xs" p="xl" m="xl">
            dissfndfnssndsfnsdkfsn
            <Rating value={score} count={5} readOnly />
        </Paper>
    )
}

export default Result