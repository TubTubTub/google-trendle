import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import theme from './theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS defaultColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
)