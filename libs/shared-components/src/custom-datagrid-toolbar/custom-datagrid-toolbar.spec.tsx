import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomDataGridToolbar } from './custom-datagrid-toolbar';
import { DataGridPro, GridColDef, GridDensity, GridFilterModel, GridInitialState, GridLogicOperator } from '@mui/x-data-grid-pro';
import { GridSlotsComponent, GridState } from '@mui/x-data-grid';
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

const renderDataGrid = (columns: GridColDef[], toolbarProps: GridSlotsComponentsProps['toolbar'], initialState?: GridInitialState) => {
    return render(
        <DataGridPro
            initialState={initialState}
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
        //Arrange
        const columns: [] = [];
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom };

        //Act
        renderDataGrid(columns, toolbarProps);
    });

    it('toggles collapse of toolbar on button click', () => {
        //Arrange
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom };

        //Act
        const { getByText } = renderDataGrid(columns, toolbarProps);
        const toggleButton = getByText(/Show table utilities/i);
        fireEvent.click(toggleButton);

        //Assert
        expect(getByText(/Hide table utilities/i)).toBeTruthy();
    });

    /*
    it('renders with the toolbar expanded when there are filters present', () => {});
*/

    it('saves the state to local storage on button click when using withManualSaveTableState', async () => {
        //Arrange
        const dataGridInitialStateWithFilters = getGridStateObject({
            items: [{ field: 'test', operator: 'contains', value: 'testing123' }],
            logicOperator: GridLogicOperator.Or,
            quickFilterValues: ['testing123'],
            quickFilterLogicOperator: GridLogicOperator.Or,
        });

        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', withManualSaveTableState: true, dataGridDensity: testDensityAtom };

        //Act
        renderDataGrid(columns, toolbarProps, dataGridInitialStateWithFilters);

        const button = screen.getByRole('button', { name: /Save table state/i });
        await userEvent.click(button);

        //Assert
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith('dataGridState-test', JSON.stringify(dataGridInitialStateWithFilters));
    });

    it('on destruction of the datagrid the state is saved to local storage when withAutoSaveTableState is enabled', () => {
        //Arrange
        const dataGridInitialStateWithFilters = getGridStateObject({
            items: [{ field: 'test', operator: 'contains', value: 'testing123' }],
            logicOperator: GridLogicOperator.Or,
            quickFilterValues: ['testing123'],
            quickFilterLogicOperator: GridLogicOperator.Or,
        });

        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', withAutoSaveTableState: true, dataGridDensity: testDensityAtom };

        //Act
        const { unmount } = renderDataGrid(columns, toolbarProps, dataGridInitialStateWithFilters);
        unmount();

        //Assert
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith('dataGridState-test', JSON.stringify(dataGridInitialStateWithFilters));
    });

    it('resets state on Reset button click', async () => {
        //Arrange
        const dataGridInitialStateWithFilters = getGridStateObject({
            items: [{ field: 'test', operator: 'contains', value: 'testing123' }],
            logicOperator: GridLogicOperator.Or,
            quickFilterValues: ['testing123'],
            quickFilterLogicOperator: GridLogicOperator.Or,
        });

        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom, alwaysEnableResetButton: true };
        renderDataGrid(columns, toolbarProps, dataGridInitialStateWithFilters);

        //Act
        const button = screen.getByRole('button', { name: /Reset/i });
        await userEvent.click(button);

        //Assert
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith('dataGridState-test', JSON.stringify({}));
    });

    // Add more tests covering other functionalities and scenarios
});

//Mocks
export const useGridRootProps = jest.fn(() => ({}));

export const useGridApiContext = jest.fn(() => ({ current: {} }));

export const getGridStateObject = (filterModel?: GridFilterModel): GridInitialState => {
    return {
        pinnedColumns: {},
        columns: {
            columnVisibilityModel: {},
            orderedFields: [],
        },
        preferencePanel: {
            open: false,
        },
        filter: {
            filterModel: filterModel ?? {
                items: [],
                logicOperator: GridLogicOperator.And,
                quickFilterValues: [],
                quickFilterLogicOperator: GridLogicOperator.And,
            },
        },
        sorting: {
            sortModel: [],
        },
        pagination: {
            paginationModel: {
                page: 0,
                pageSize: 100,
            },
            rowCount: 0,
        },
    };
};
