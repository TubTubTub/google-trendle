import { Box, useMantineTheme } from '@mantine/core'
import { IoIosArrowBack } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import { useSetError } from '../contexts/ErrorContextHooks'
import usePreviousTrendle from '../hooks/usePreviousTrendle'

const PreviousTrendle = ({ canvas }) => {
    const setError = useSetError()
    const [previousDisabled, loadPreviousTrendle] = usePreviousTrendle(canvas)
    const theme = useMantineTheme()

    return (
        <Box w="2rem">
            <ToolIconButton size={theme.other.canvasButtonHeight} label="Previous trendle" onClick={loadPreviousTrendle} icon={<IoIosArrowBack />} disabled={previousDisabled} tooltip />
        </Box>
    )
}

export default PreviousTrendle