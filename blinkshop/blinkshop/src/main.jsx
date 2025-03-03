import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
   <Auth0Provider domain='dev-yecqqx2brys1xssx.us.auth0.com' clientId='4rfWRbxMSztcXXXJoMJWzFW7GlsN9fdA' authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App/>
    </Auth0Provider>
    
  
  </StrictMode>
)
