import { Box, useMantineTheme, rem } from '@mantine/core'
import { IoIosArrowForward } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import useNextTrendle from '../hooks/useNextTrendle'

const NextTrendle = () => {
    const loadNextTrendle = useNextTrendle()
    const theme = useMantineTheme()
    return (
        <Box style={{width: rem('2rem'),flexShrink: 1}}>
            <ToolIconButton size={theme.other.canvasButtonHeight} label="Next trendle" onClick={loadNextTrendle} icon={<IoIosArrowForward />} tooltip />
        </Box>
    )
}

export default NextTrendle