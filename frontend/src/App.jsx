import { AppShell } from '@mantine/core'
import Header from './components/Header'
import GameMain from './components/GameMain'
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
                <GameMain />
            </AppShell.Main>

            <AppShell.Footer px="md" py="xs">
                <Footer />
            </AppShell.Footer>

        </AppShell>
    )
}

export default App