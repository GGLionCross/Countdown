// React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Material Design
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './themes/darkTheme.ts';

// Local Imports
import App from './App.tsx';
import './index.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <ThemeProvider theme={darkTheme}>
                <App />
            </ThemeProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
