// import { Button } from '@mui/material'
// import { StrictMode, useState } from 'react'
// import keycloak from './config/keycloakConfig'
// import { ReactKeycloakProvider } from '@react-keycloak/web'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'
import BookingPage from './pages/BookingPage'
import SecuredRoute from './components/SecuredRoute'
import Layout from './components/Layout'
import { AppContextProvider } from './context/AppContext'
import keycloak from './config/keycloakConfig'

function App() {

  return (
    <>
    <ReactKeycloakProvider 
      initOptions={{
        // onLoad: 'login-required',
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false
      }}
      authClient={keycloak}
    >
      <AppContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/booking" element={
              // <SecuredRoute>
                <BookingPage />
                // {/* </SecuredRoute> */}
              } />
          </Route>
        </Routes>
      </AppContextProvider>
    </ReactKeycloakProvider>
    </>
  )
}

export default App
