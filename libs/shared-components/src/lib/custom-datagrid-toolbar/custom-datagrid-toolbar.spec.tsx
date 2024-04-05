import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CustomDataGridToolbar } from './custom-datagrid-toolbar';
import { DataGridPro, GridColDef, GridDensity, GridFilterModel, GridInitialState, GridLogicOperator, useGridRootProps } from '@mui/x-data-grid-pro';
import { GridSlotsComponent, GridState } from '@mui/x-data-grid';
import userEvent from '@testing-library/user-event';
import { GridSlotsComponentsProps } from '@mui/x-data-grid/models/gridSlotsComponentsProps';
import { atomWithStorage } from 'jotai/vanilla/utils';
import * as useGridRootPropsModule from '@mui/x-data-grid-pro'; // Import the module

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

    it('saves the state to local storage on button click when using withManualSaveTableState', async () => {
        //Arrange
        const dataGridInitialStateWithFilters = mockGridStateObject({
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
        const dataGridInitialStateWithFilters = mockGridStateObject({
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

    //ToDo figure out difference between spy and mock and why this breaks the mock up top
    it('resets state on Reset button click', async () => {
        // Arrange
        const mockInitialState = mockGridStateObject({
            items: [{ field: 'test', operator: 'contains', value: 'testing123' }],
            logicOperator: 'or' as any,
            quickFilterValues: ['testing123'],
            quickFilterLogicOperator: 'or' as any,
        });

        const useGridRootPropsSpy = jest.spyOn(useGridRootPropsModule, 'useGridRootProps').mockReturnValue({ initialState: mockInitialState } as any);
        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom, withManualSaveTableState: true };
        renderDataGrid(columns, toolbarProps);

        //Act
        const button = screen.getByRole('button', { name: /Reset/i });
        await userEvent.click(button);

        //wait for 250ms for reset to complete
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 250));
        });

        //Assert
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith('dataGridState-test', JSON.stringify({}));
        expect(button).toHaveProperty('disabled', true);

        // Cleanup
        useGridRootPropsSpy.mockReset();
    });

    it('renders with the toolbar expanded when there are filters present', () => {
        //Arrange
        const mockInitialState = mockGridStateObject({
            items: [{ field: 'test', operator: 'contains', value: 'testing123' }],
            logicOperator: 'or' as any,
            quickFilterValues: ['testing123'],
            quickFilterLogicOperator: 'or' as any,
        });

        const useGridRootPropsSpy = jest.spyOn(useGridRootPropsModule, 'useGridRootProps').mockReturnValue({ initialState: mockInitialState } as any);

        const columns: [] = []; // Define your columns array here
        const toolbarProps = { dataGridIdentifier: 'test', dataGridDensity: testDensityAtom };

        //Act
        const { getByText } = renderDataGrid(columns, toolbarProps);

        //Assert
        expect(getByText(/Hide table utilities/i)).toBeTruthy();
        useGridRootPropsSpy.mockReset();
    });
});

//Mocks
export const mockGridStateObject = (filterModel?: GridFilterModel): GridInitialState => {
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
