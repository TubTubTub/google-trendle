import { Box, useMantineTheme } from '@mantine/core'
import { IoIosArrowForward } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import useNextTrendle from '../hooks/useNextTrendle'

const NextTrendle = ({ canvas }) => {
    const loadNextTrendle = useNextTrendle(canvas)
    const theme = useMantineTheme()
    return (
        <Box w='2rem' style={{ flexShrink: 1} }>
            <ToolIconButton size={theme.other.canvasButtonHeight} label="Next trendle" onClick={loadNextTrendle} icon={<IoIosArrowForward />} tooltip />
        </Box>
    )
}

export default NextTrendle