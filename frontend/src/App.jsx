import { AppShell } from '@mantine/core'
import './styles.css'

import useMouseSidebar from './hooks/useMouseSidebar'
import Rankings from './components/Rankings'
import History from './components/History'
import Header from './components/Header'
import Footer from './components/Footer'
import Game from './components/Game'

const mergeRefs = (...inputRefs) => {
    return (ref) => {
        inputRefs.forEach((inputRef) => {
            if (!inputRef) {
                return
            }

            if (typeof inputRef === 'function') {
                inputRef(ref)
            } else {
                inputRef.current = ref
            }
        })
    }
}

const App = () => {
    const [navbarRef, navbarOpened] = useMouseSidebar(300, 60, 'left')
    const [asideRef, asideOpened] = useMouseSidebar(300, 60, 'right')

    return (
        <AppShell
            layout="alt"
            header={{ height: '4rem' }}
            navbar={{ width: '20rem', breakpoint: 'lg', collapsed: { desktop: !navbarOpened, mobile: true } }}
            aside={{ width: '20rem', breakpoint: 'lg', collapsed: { desktop: !asideOpened, mobile: true }}}
            footer={{ height: '4rem' }}
            padding={0}
            ref={mergeRefs(navbarRef, asideRef)}
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main>
                <Game />
            </AppShell.Main>

            <AppShell.Navbar>
                <Rankings />
            </AppShell.Navbar>

            <AppShell.Aside>
                <History />
            </AppShell.Aside>

            <AppShell.Footer withBorder={false}>
                <Footer />
            </AppShell.Footer>

        </AppShell>
    )
}

export default App