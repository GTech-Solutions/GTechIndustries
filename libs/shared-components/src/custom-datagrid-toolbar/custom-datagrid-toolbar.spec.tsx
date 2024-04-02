import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomDataGridToolbar } from '@gtech/shared-components';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridSlotsComponent } from '@mui/x-data-grid';

// Jest will automatically use the mocked version of useGridRootProps
// Mocking useGridRootProps
jest.mock('@mui/x-data-grid-pro', () => ({
    ...jest.requireActual('@mui/x-data-grid-pro'), // Use actual implementation for everything else
    useGridRootProps: jest.fn(() => ({})),
}));

const renderDataGrid = (columns, toolbarProps) => {
    return render(
        <DataGridPro
            columns={columns}
            slots={{ toolbar: CustomDataGridToolbar as GridSlotsComponent['toolbar'] }}
            slotProps={{ toolbar: toolbarProps }}
        />
    );
};

describe('CustomDataGridToolbar', () => {
    it('renders without crashing', () => {
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test' };

        renderDataGrid(columns, toolbarProps);
    });

    it('toggles collapse on button click', () => {
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test' };

        const { getByText } = renderDataGrid(columns, toolbarProps);
        const toggleButton = getByText(/Show table utilities/i);
        fireEvent.click(toggleButton);
        expect(getByText(/Hide table utilities/i)).toBeTruthy();
    });

    it('resets state on Reset button click', () => {
        const { getByText } = render(<CustomDataGridToolbar dataGridIdentifier='test' />);
        const resetButton = getByText(/Reset/i);
        fireEvent.click(resetButton);
        // Write your assertions for state reset here
    });

    // Add more tests covering other functionalities and scenarios
});

//Mocks
export const useGridRootProps = jest.fn(() => ({}));

export const useGridApiContext = jest.fn(() => ({ current: {} }));
