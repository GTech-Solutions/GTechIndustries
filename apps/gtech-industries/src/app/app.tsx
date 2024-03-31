import { CssBaseline, ThemeProvider } from '@mui/material';
import useGtechIndustriesTheme from './styling/use-gtech-industries-theme';
import { useState } from 'react';
import { Routes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { themeColorMode } from '@gtech/shared-components';

export function App() {
    const themeMode = useAtomValue(themeColorMode);
    const appTheme = useGtechIndustriesTheme(themeMode);

    return (
        <ThemeProvider theme={appTheme.theme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    );
}

export default App;
