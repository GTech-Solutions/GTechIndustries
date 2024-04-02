import React, { useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Collapse, Stack } from '@mui/material';
import {
    GridColumnVisibilityModel,
    GridDensity,
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { KeyboardArrowDown, KeyboardArrowUp, RestartAlt, Save } from '@mui/icons-material';
import { useGridApiContext, useGridRootProps, GridInitialState } from '@mui/x-data-grid-pro';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomDataGridToolbarProps {
    dataGridIdentifier: string;
    withAutoSaveTableState?: boolean;
    withManualSaveTableState?: boolean;
    defaultHiddenColumns?: GridColumnVisibilityModel;
}

export interface IDataGridControl {
    totalRows?: number;
    paginationModel: GridPaginationModel;
    filterModel: GridFilterModel;
    sortModel: GridSortModel;
    density: GridDensity | undefined;
    columnModel: GridColumnVisibilityModel;
}

export const defaultDataGridControl: IDataGridControl = {
    paginationModel: { page: 0, pageSize: 15 },
    filterModel: { items: [], quickFilterValues: [] },
    columnModel: {},
    density: undefined,
    sortModel: [],
};

const CustomDataGridToolbar: React.FC<ICustomDataGridToolbarProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();
    const [initialState, setInitialState] = React.useState<GridInitialState>();
    const LOCAL_STORAGE_KEY = `dataGridState-${props.dataGridIdentifier}`;

    useEffect(() => {
        //ToDo abstract /make this better
        if (apiRef.current) {
            apiRef.current.subscribeEvent('columnVisibilityModelChange', () => {
                setIsDirty(true);
            });
            apiRef.current.subscribeEvent('filterModelChange', () => {
                setIsDirty(true);
            });
            apiRef.current.subscribeEvent('sortModelChange', () => {
                setIsDirty(true);
            });
            apiRef.current.subscribeEvent('paginationModelChange', () => {
                setIsDirty(true);
                setIsOpen(true);
            });
            apiRef.current.subscribeEvent('densityChange', () => {
                setIsDirty(true);
            });
        }
    }, []);

    useEffect(() => {
        if (initialState !== undefined) {
            //turn initial state into defaultDataGridControl
            const initialStateAsDefault = {
                paginationModel: initialState?.pagination?.paginationModel ?? defaultDataGridControl.paginationModel,
                filterModel: initialState?.filter?.filterModel ?? defaultDataGridControl.filterModel,
                columnModel:
                    initialState?.columns?.columnVisibilityModel ?? props.defaultHiddenColumns
                        ? props.defaultHiddenColumns
                        : defaultDataGridControl.columnModel,
                density: initialState?.density ?? defaultDataGridControl.density,
                sortModel: initialState?.sorting?.sortModel ?? defaultDataGridControl.sortModel,
            };

            //check if initial state is equal to defaultDataGridControl with props.defaultHiddenColumns as columnModel
            const isInitialStateEqualToDefault =
                JSON.stringify(initialStateAsDefault) ===
                JSON.stringify({
                    ...defaultDataGridControl,
                    columnModel: props.defaultHiddenColumns ? props.defaultHiddenColumns : defaultDataGridControl.columnModel,
                });

            !isInitialStateEqualToDefault && setIsOpen(true);
            setIsDirty(!isInitialStateEqualToDefault);
        }
    }, [initialState, props.defaultHiddenColumns]);

    const onSaveTableState = React.useCallback(() => {
        if (apiRef?.current?.exportState && localStorage) {
            const currentState = apiRef.current.exportState();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
        }
    }, [apiRef]);

    React.useLayoutEffect(() => {
        if (props.withAutoSaveTableState || props.withManualSaveTableState) {
            const stateFromLocalStorage = localStorage?.getItem(LOCAL_STORAGE_KEY);
            setInitialState(stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {});

            apiRef.current.restoreState(stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : ({} as GridInitialState));
        }

        if (props.withAutoSaveTableState) {
            // handle refresh and navigating away/refreshing
            window.addEventListener('beforeunload', onSaveTableState);

            return () => {
                // in case of an SPA remove the event-listener
                window.removeEventListener('beforeunload', onSaveTableState);
                onSaveTableState();
            };
        }
    }, [onSaveTableState]);

    const onClickReset = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        apiRef.current.setFilterModel(defaultDataGridControl.filterModel);
        apiRef.current.setSortModel(defaultDataGridControl.sortModel);
        apiRef.current.setPaginationModel(defaultDataGridControl.paginationModel);
        apiRef.current.setDensity(defaultDataGridControl.density ?? 'standard');
        apiRef.current.setColumnVisibilityModel(props.defaultHiddenColumns ? props.defaultHiddenColumns : defaultDataGridControl.columnModel);

        setTimeout(() => {
            setIsDirty(false);
        }, 250);
    };

    return (
        <Stack alignItems={'start'} direction={'row'} justifyContent={'space-between'}>
            <Stack width={'100%'} alignItems={'start'}>
                <Stack width={'100%'} alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
                    <Button
                        className={cx(classes.filterOptionButton)}
                        endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        onClick={() => setIsOpen(!isOpen)}
                        variant='text'
                    >
                        {isOpen ? 'Hide' : 'Show'} table utilities
                    </Button>
                    {isOpen && (
                        <Stack direction={'row'}>
                            <Button
                                aria-label={'Reset table controls'}
                                startIcon={<RestartAlt />}
                                variant={'text'}
                                disabled={!isDirty}
                                onClick={onClickReset}
                            >
                                Reset
                            </Button>
                            {props.withManualSaveTableState && (
                                <Button startIcon={<Save />} variant={'text'} onClick={onSaveTableState} {...rootProps.slotProps?.baseButton}>
                                    Save table state
                                </Button>
                            )}
                        </Stack>
                    )}
                </Stack>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    <GridToolbarContainer>
                        <GridToolbarColumnsButton />
                        <GridToolbarFilterButton />
                        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                        <Box sx={{ flexGrow: 1 }} />
                        <GridToolbarExport
                            slotProps={{
                                tooltip: { title: 'Export data' },
                                button: { variant: 'outlined' },
                            }}
                        />
                    </GridToolbarContainer>
                </Collapse>
            </Stack>
        </Stack>
    );
};

const useStyles = makeStyles<ICustomDataGridToolbarProps>()((theme, props) => ({
    filterOptionButton: {
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        textTransform: 'none',
    },
}));

export { CustomDataGridToolbar };
