import { AppShell, Center, Stack } from '@mantine/core'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Footer from './components/Footer'
import GameSettings from './components/GameSettings'
import Result from './components/Result'

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
                <Center style={{ height: "80vh" }}>
                    <Stack>
                        <GameSettings />
                        <Canvas />
                    </Stack>
                    <Result />
                </Center>
            </AppShell.Main>

            <AppShell.Footer px="md" py="xs">
                <Footer />
            </AppShell.Footer>

        </AppShell>
    )
}

export default App