import { Box, useMantineTheme } from '@mantine/core'
import { IoIosArrowBack } from 'react-icons/io'

import { ToolIconButton } from './Buttons'

import usePreviousTrendle from '../hooks/usePreviousTrendle'

const PreviousTrendle = () => {
    const [previousDisabled, loadPreviousTrendle] = usePreviousTrendle()
    const theme = useMantineTheme()

    return (
        <Box w="2rem">
            <ToolIconButton size={theme.other.canvasButtonHeight} label="Previous trendle" onClick={loadPreviousTrendle} icon={<IoIosArrowBack />} disabled={previousDisabled} tooltip />
        </Box>
    )
}

export default PreviousTrendle