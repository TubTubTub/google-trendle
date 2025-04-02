import { Group, Stack, Text } from '@mantine/core'
import { PiLineVerticalBold } from 'react-icons/pi'

const XAxis = ({ size, number, axisRef }) => {
    const labelsArray = []
    const currentDate = new Date()

    if (size === 'm') {
        currentDate.setMonth(currentDate.getMonth() + 1)

        for (let i = 0 ; i < number ; i++) {
            currentDate.setMonth(currentDate.getMonth() - 1)
            labelsArray.push(currentDate.getMonth() + 1)
        }
    }
    else if (size === 'y') {
        currentDate.setYear(currentDate.getFullYear())

        for (let i = 0 ; i < number ; i++) {
            currentDate.setYear(currentDate.getFullYear() - 1)
            labelsArray.push(currentDate.getFullYear() + 1)
        }
    }

    return (
        <Group justify="space-between" ref={axisRef}>
            {
                labelsArray.reverse().map((label, index) => (
                    <Stack key={index} gap={0}>
                        <PiLineVerticalBold color="gray" size="0.75rem" style={{ marginTop: '-1px' }}/>
                        <Text fw={500} c="dimmed">{label}</Text>
                    </Stack>
                ))
            }
        </Group>
    )
}

export default XAxis