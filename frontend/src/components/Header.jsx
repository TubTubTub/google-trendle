import { useDisclosure } from '@mantine/hooks'
import { Group, Title, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { FiMoon, FiSun } from 'react-icons/fi'
import { BsQuestionLg } from 'react-icons/bs'

import { ToolIconButton } from './Buttons'
import Help from './Help'
import Login from './Login'

const Header = () => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const [helpOpened, helpHandler] = useDisclosure(false)

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
    }

    return (
        <Group h="100%" justify="space-between" px="0.75rem">
            <Title order={3} pl="0.25rem">Google Trendle</Title>

            <Group justify="flex-end" gap="0.75rem">
                <ToolIconButton
                    label="Open help screen"
                    onClick={helpHandler.open}
                    icon={<BsQuestionLg size="2em"/>}
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