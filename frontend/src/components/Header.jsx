import { useDisclosure } from '@mantine/hooks'
import { Group, Title, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { FiMoon, FiSun } from 'react-icons/fi'
import { IoHelpOutline } from 'react-icons/io5'
import { ToolIconButton } from './Buttons'

import Help from './Help'
import Login from './Login'

const Header = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const [helpOpened, helpHandler] = useDisclosure(false)
    
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
    }

    return (
        <Group h="100%" justify="space-between">
            <Title order={3}>Google Trendle</Title>

            <Group justify="flex-end">
                <ToolIconButton
                    label="Open help screen"
                    onClick={helpHandler.open}
                    icon={<IoHelpOutline size="2em"/>}
                    size="xl"
                />
                <ToolIconButton
                    label="Toggle colour scheme"
                    onClick={toggleColorScheme}
                    icon={computedColorScheme === 'light' ? <FiMoon size="2em" /> : <FiSun size="2em" />}
                    size="xl"
                />
                <Help opened={helpOpened} onClose={helpHandler.close} />
                <Login />
            </Group>
        </Group>
    )
}

export default Header