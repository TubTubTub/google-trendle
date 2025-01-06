import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { MantineProvider } from '@mantine/core'
import theme from './theme'
import '@mantine/core/styles.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { TrendsContextProvider } from './contexts/TrendsContext'
import { ErrorContextProvider } from './contexts/ErrorContext'
import { ProfileContextProvider } from './contexts/ProfileContext'
import { HistoryContextProvider } from './contexts/HistoryContext'
import { CanvasContextProvider } from './contexts/CanvasContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS defaultColorScheme="light">
        <TrendsContextProvider>
          <ErrorContextProvider>
            <ProfileContextProvider>
              <HistoryContextProvider>
                <CanvasContextProvider>
                  <App />
                </CanvasContextProvider>
              </HistoryContextProvider>
            </ProfileContextProvider>
          </ErrorContextProvider>
        </TrendsContextProvider>
      </MantineProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)