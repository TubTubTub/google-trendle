import { useMantineTheme } from '@mantine/core'
import { IoIosArrowForward } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import useNextTrendle from '../hooks/useNextTrendle'

const NextTrendle = () => {
    const loadNextTrendle = useNextTrendle()
    const theme = useMantineTheme()
    return (
        <ToolIconButton size={theme.other.canvasButtonHeight} label="Next trendle" onClick={loadNextTrendle} icon={<IoIosArrowForward />} tooltip />
    )
}

export default NextTrendle