import { render } from '@testing-library/react';
import App from './app';
import { GridSlotsComponent } from '@mui/x-data-grid';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const renderApp = () => {
    return render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = renderApp();
        expect(baseElement).toBeTruthy();
    });

    it('should have a DataGrid element in the AppBar', () => {
        const { getByText } = renderApp();
        expect(getByText(/DataGrid/gi)).toBeTruthy();
    });
});
