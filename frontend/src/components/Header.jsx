import { Group, Title, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { FiMoon, FiSun } from 'react-icons/fi'
import { ToolIconButton } from './Buttons'

const Header = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
    }

    return (
        <Group h="100%" justify="space-between">
            <Title order={3}>Google Trendle</Title>
            <ToolIconButton
                label="Toggle colour scheme"
                onClick={toggleColorScheme}
                icon={computedColorScheme === 'light' ? <FiMoon size="2em" /> : <FiSun size="2em" />}
                size="xl"
            />
        </Group>
    )
}

export default Header