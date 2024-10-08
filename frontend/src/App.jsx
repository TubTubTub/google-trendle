import { AppShell, Center, Stack } from '@mantine/core'
import Header from './components/Header'
import Game from './components/Game'
import Footer from './components/Footer'
import GameSettings from './components/GameSettings'
import Result from './components/Result'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { ToolIconButton } from './components/Buttons'

const App = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header px="md">
                <Header />
            </AppShell.Header>

            <AppShell.Main>
                <Center style={{ height: "80vh", gap: '2em' }}>
                    <ToolIconButton label="Previous trendle" onClick={() => console.log('back')} icon={<IoIosArrowBack />} tooltip />
                    <Stack>
                        <GameSettings />
                        <Game />
                        <Result />
                    </Stack>
                    <ToolIconButton label="Next trendle" onClick={() => console.log('next')} icon={<IoIosArrowForward />} tooltip />
                </Center>
            </AppShell.Main>

            <AppShell.Footer px="md" py="xs">
                <Footer />
            </AppShell.Footer>

        </AppShell>
    )
}

export default App