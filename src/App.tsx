// Component ImportsGoogleL
import AppRouter from './routes/AppRouter';

// Local Imports
import './App.css'
import { loadGoogleFonts } from './themes/fonts';

function App() {
    loadGoogleFonts();
    return <AppRouter />
}

export default App
