import { Paper, CloseButton, Button, Flex, Transition } from '@mantine/core'

import useNextTrendle from '../../hooks/useNextTrendle'

import { FaArrowRightLong } from 'react-icons/fa6'
import ResultStatistics from './ResultStatistics'

const Result = ({ open, onClose }) => {
    const loadNextTrendle = useNextTrendle()

    return (
        <Transition
            mounted={open}
            transition="slide-right"
            duration={200}
            timingFunction="ease"
            keepMounted
        >
            {(transitionStyle) => (
                <Paper shadow="md" radius="sm" p="md" h={400} style={{...transitionStyle, zIndex: 1, position: 'absolute', right: '24vw' }}>
                    <Flex justify="flex-end">
                        <CloseButton onClick={() => onClose()}/>
                    </Flex>

                    <ResultStatistics />

                    <Flex justify="center">
                        <Button onClick={loadNextTrendle} rightSection={<FaArrowRightLong />}>
                            Next Trendle
                        </Button>
                    </Flex>
                </Paper>
            )}
        </Transition>
    )
}

export default Result