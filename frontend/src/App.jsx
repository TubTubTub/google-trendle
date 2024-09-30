import { AppShell, Center } from '@mantine/core'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Footer from './components/Footer'

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
                    <Canvas />
                </Center>
            </AppShell.Main>

            <AppShell.Footer px="md" py="xs">
                <Footer />
            </AppShell.Footer>

        </AppShell>
    )
}

export default App