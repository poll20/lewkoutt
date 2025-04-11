import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'
import { LoadingProvider } from './components/LoadingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <LoadingProvider>
   <Auth0Provider domain={import.meta.env.VITE_AUTH0_DOMAIN} clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} authorizationParams={{
      redirect_uri:window.location.origin
    }}>
    <App/>
    </Auth0Provider>
    </LoadingProvider>
  
  </StrictMode>
)
