import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Collapse, Stack } from '@mui/material';
import {
    GridColumnVisibilityModel,
    GridDensity,
    GridFilterModel,
    GridPaginationModel,
    GridSlotProps,
    GridSortModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid-pro';
import { KeyboardArrowDown, KeyboardArrowUp, RestartAlt, Save } from '@mui/icons-material';
import { useGridApiContext, useGridRootProps, GridInitialState } from '@mui/x-data-grid-pro';
import { useAtom, useAtomValue, WritableAtom } from 'jotai';
import { atomWithStorage } from 'jotai/vanilla/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ICustomDataGridToolbarProps = GridSlotProps['toolbar'] & {
    dataGridIdentifier: string;
    withAutoSaveTableState?: boolean;
    withManualSaveTableState?: boolean;
    defaultHiddenColumns?: GridColumnVisibilityModel;
    dataGridDensity: WritableAtom<GridDensity, any, void>;
};

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
    const LOCAL_STORAGE_KEY = `dataGridState-${props.dataGridIdentifier}`;
    const density = useAtomValue(props.dataGridDensity);
    const dataGridStateAtom = useMemo(
        () => atomWithStorage<GridInitialState>(LOCAL_STORAGE_KEY, {}, undefined, { getOnInit: true }),
        [props.dataGridIdentifier, props.withAutoSaveTableState, props.withManualSaveTableState]
    );
    const [initialState, setInitialState] = useAtom(dataGridStateAtom);

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
            });
            apiRef.current.subscribeEvent('densityChange', () => {
                setIsDirty(true);
            });
        }
    }, []);

    useEffect(() => {
        if (initialState !== undefined) {
            const isInitialStateEqualToDefault = checkIfStateIsDirty(initialState);
            const isRootPropsInitialStateEqualToDefault = checkIfStateIsDirty(rootProps.initialState ?? {});

            (!isInitialStateEqualToDefault || !isRootPropsInitialStateEqualToDefault) && setIsOpen(true);
            setIsDirty(!isInitialStateEqualToDefault || !isRootPropsInitialStateEqualToDefault);
        }
    }, [initialState, rootProps.initialState, props.defaultHiddenColumns]);

    const checkIfStateIsDirty = (stateToCheck: GridInitialState) => {
        //turn initial state into defaultDataGridControl
        const initialStateAsDefault = {
            paginationModel: stateToCheck?.pagination?.paginationModel ?? defaultDataGridControl.paginationModel,
            filterModel: stateToCheck?.filter?.filterModel ?? defaultDataGridControl.filterModel,
            columnModel:
                stateToCheck?.columns?.columnVisibilityModel ?? props.defaultHiddenColumns
                    ? props.defaultHiddenColumns
                    : defaultDataGridControl.columnModel,
            density: stateToCheck?.density ?? defaultDataGridControl.density,
            sortModel: stateToCheck?.sorting?.sortModel ?? defaultDataGridControl.sortModel,
        };

        //check if initial state is equal to defaultDataGridControl with props.defaultHiddenColumns as columnModel
        const isInitialStateEqualToDefault =
            JSON.stringify(initialStateAsDefault) ===
            JSON.stringify({
                ...defaultDataGridControl,
                columnModel: props.defaultHiddenColumns ? props.defaultHiddenColumns : defaultDataGridControl.columnModel,
            });

        return isInitialStateEqualToDefault;
    };

    const onSaveTableState = React.useCallback(() => {
        if (apiRef?.current?.exportState && localStorage) {
            const currentState = apiRef.current.exportState();
            setInitialState(currentState);
        }
    }, []);

    useLayoutEffect(() => {
        if (props.withAutoSaveTableState || props.withManualSaveTableState) {
            apiRef.current.setDensity(density);
            apiRef.current.restoreState(initialState);
        }

        if (props.withAutoSaveTableState) {
            //  apiRef.current.restoreState(initialState);

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
        setInitialState({});
        apiRef.current.setFilterModel(defaultDataGridControl.filterModel);
        apiRef.current.setSortModel(defaultDataGridControl.sortModel);
        apiRef.current.setPaginationModel(defaultDataGridControl.paginationModel);
        apiRef.current.setColumnVisibilityModel(props.defaultHiddenColumns ? props.defaultHiddenColumns : defaultDataGridControl.columnModel);

        setTimeout(() => {
            setIsDirty(false);
        }, 250);
    };

    return (
        <Stack alignItems={'start'} direction={'row'} justifyContent={'space-between'}>
            <Stack width={'100%'} alignItems={'start'}>
                <Stack width={'100%'} alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
                    <Stack spacing={2} direction={'row'}>
                        <Button
                            className={cx(classes.filterOptionButton)}
                            endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            onClick={() => setIsOpen(!isOpen)}
                            variant='text'
                        >
                            {isOpen ? 'Hide' : 'Show'} table utilities
                        </Button>
                        {props.showQuickFilter && <GridToolbarQuickFilter />}
                    </Stack>
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
                </Stack>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    <Stack spacing={3.3} direction={'row'}>
                        <GridToolbarColumnsButton />
                        <GridToolbarFilterButton />
                        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                        <GridToolbarExport
                            slotProps={{
                                tooltip: { title: 'Export data' },
                                button: { variant: 'outlined' },
                            }}
                        />
                    </Stack>
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
