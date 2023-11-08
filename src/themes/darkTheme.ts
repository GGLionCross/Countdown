import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
        default: '#121212', // This is the default dark mode background.
        paper: '#1e1e1e', // This is the background color for components like Card, Paper, etc.
    },
  },
  // ... other customizations
});

export default darkTheme;
