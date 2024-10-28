import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import theme from './theme'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { TrendsContextProvider } from './contexts/TrendsContext'
import { ErrorContextProvider } from './contexts/ErrorContext'
import { ProfileContextProvider } from './contexts/ProfileContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS defaultColorScheme="light">
        <TrendsContextProvider>
          <ErrorContextProvider>
            <ProfileContextProvider>
              <App />
            </ProfileContextProvider>
          </ErrorContextProvider>
        </TrendsContextProvider>
      </MantineProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)