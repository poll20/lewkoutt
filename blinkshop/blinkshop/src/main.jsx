// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import "../public/fonts.css"
// import { LoadingProvider } from './components/LoadingContext.jsx';
// import { FirebaseAuthProvider } from './components/FirebaseContext.jsx';
// import { UserProvider } from './components/UserContext.jsx';
// createRoot(document.getElementById('root')).render(

//    <LoadingProvider>
//    <FirebaseAuthProvider>
//     <UserProvider>
//      <App/>
//      </UserProvider>
//     </FirebaseAuthProvider>
//     </LoadingProvider>
    
// )
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import App from './App.jsx'
import './index.css'
import "../public/fonts.css"

import { LoadingProvider } from './components/LoadingContext.jsx';
import { FirebaseAuthProvider } from './components/FirebaseContext.jsx';
import { UserProvider } from './components/UserContext.jsx';

// ✅ SENTRY INIT (ONLY ONCE)
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  tracesSampleRate: 1.0,
  sendDefaultPii: false, // ✅ recommended
});

createRoot(document.getElementById('root')).render(
  <Sentry.ErrorBoundary fallback={<h2>Something went wrong</h2>}>
    <LoadingProvider>
      <FirebaseAuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </FirebaseAuthProvider>
    </LoadingProvider>
  </Sentry.ErrorBoundary>
);