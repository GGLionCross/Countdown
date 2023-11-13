// React
import { useEffect } from 'react';

// Component ImportsGoogleL
import AppRouter from './routes/AppRouter';

// Local Imports
import './App.css';
import { fetchGoogleFonts, createLinkToGoogleFonts } from './themes/fonts';

function App() {
    useEffect(() => {
        fetchGoogleFonts();
        const linkEl = createLinkToGoogleFonts();
        // Remove link during cleanup to prevent memory leaks
        return () => {
            document.head.removeChild(linkEl);
        };
    }, []);
    return <AppRouter />;
}

export default App;
