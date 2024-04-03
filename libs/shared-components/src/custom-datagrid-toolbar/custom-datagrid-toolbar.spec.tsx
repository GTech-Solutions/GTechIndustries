import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CustomDataGridToolbar } from './custom-datagrid-toolbar';
import { DataGridPro, GridColDef, GridDensity } from '@mui/x-data-grid-pro';
import { GridSlotsComponent } from '@mui/x-data-grid';
import userEvent from '@testing-library/user-event';
import { GridSlotsComponentsProps } from '@mui/x-data-grid/models/gridSlotsComponentsProps';
import { atomWithStorage } from 'jotai/vanilla/utils';

// Jest will automatically use the mocked version of useGridRootProps
// Mocking useGridRootProps
jest.mock('@mui/x-data-grid-pro', () => ({
    ...jest.requireActual('@mui/x-data-grid-pro'), // Use actual implementation for everything else
    useGridRootProps: jest.fn(() => ({})),
}));

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
        removeItem: (...args: string[]) => mockRemoveItem(...args),
    },
});

//ToDo mock this?
const testDensityAtom = atomWithStorage<GridDensity>(`$test-datagrid-density`, 'standard', undefined, { getOnInit: true });

const renderDataGrid = (columns: GridColDef[], toolbarProps: GridSlotsComponentsProps['toolbar']) => {
    return render(
        <DataGridPro
            columns={columns}
            slots={{ toolbar: CustomDataGridToolbar as GridSlotsComponent['toolbar'] }}
            slotProps={{ toolbar: toolbarProps }}
        />
    );
};

describe('CustomDataGridToolbar', () => {
    beforeEach(() => {
        mockSetItem.mockClear();
        mockSetItem.mockClear();
    });

    it('renders without crashing', () => {
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom };

        renderDataGrid(columns, toolbarProps);
    });

    it('toggles collapse on button click', () => {
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom };

        const { getByText } = renderDataGrid(columns, toolbarProps);
        const toggleButton = getByText(/Show table utilities/i);
        fireEvent.click(toggleButton);
        expect(getByText(/Hide table utilities/i)).toBeTruthy();
    });

    /*
    it('renders with the toolbar expanded when there are filters present', () => {});
*/

    it('saves the state to local storage on button click', async () => {
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', withManualSaveTableState: true, dataGridDensity: 'test' };

        renderDataGrid(columns, toolbarProps);
        const button = screen.getByRole('button', { name: /Save table state/i });

        await userEvent.click(button);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        //  expect(mockSetItem).toHaveBeenCalledWith('mydata', 'myvalue');
    });

    /*
    it('on destruction of the datagrid the state is saved to local storage', () => {});
*/

    /*    it('resets state on Reset button click', () => {
        const { getByText } = render(<CustomDataGridToolbar dataGridIdentifier='test' />);
        const resetButton = getByText(/Reset/i);
        fireEvent.click(resetButton);
        // Write your assertions for state reset here
    });*/

    // Add more tests covering other functionalities and scenarios
});

//Mocks
export const useGridRootProps = jest.fn(() => ({}));

export const useGridApiContext = jest.fn(() => ({ current: {} }));
