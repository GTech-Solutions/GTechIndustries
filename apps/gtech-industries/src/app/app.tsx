import { CssBaseline, ThemeProvider } from '@mui/material';
import useGtechIndustriesTheme from './styling/use-gtech-industries-theme';
import { useState } from 'react';
import { Routes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';

export function App() {
    //ToDo hoist into global state
    const [themeMode, setThemeMode] = useState('light');

    const appTheme = useGtechIndustriesTheme(themeMode);

    return (
        <ThemeProvider theme={appTheme.theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
