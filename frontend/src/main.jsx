import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@mantine/core/styles.css'

import { CanvasContextProvider } from './contexts/CanvasContext.jsx'
import { ProfileContextProvider } from './contexts/ProfileContext'
import { HistoryContextProvider } from './contexts/HistoryContext'
import { TrendsContextProvider } from './contexts/TrendsContext'
import { ErrorContextProvider } from './contexts/ErrorContext'
import initialiseAxios from './initialiseAxios.js'
import theme from './theme'
import App from './App.jsx'

initialiseAxios()

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