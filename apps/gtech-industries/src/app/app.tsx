import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Routes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { themeColorMode } from '@gtech/shared-components';
import useGtechIndustriesTheme from './styling/use-gtech-industries-theme';

export function App() {
    const themeMode = useAtomValue(themeColorMode);
    const appTheme = createTheme(useGtechIndustriesTheme(themeMode));

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    );
}

export default App;
