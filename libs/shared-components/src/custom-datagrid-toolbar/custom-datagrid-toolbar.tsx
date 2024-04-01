import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Collapse, Stack } from '@mui/material';
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { KeyboardArrowDown, KeyboardArrowUp, RestartAlt } from '@mui/icons-material';
import { useGridApiContext, useGridRootProps, GridInitialState } from '@mui/x-data-grid-pro';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomDataGridToolbarProps {
    identifier: string;
    withAutoSaveTableState?: boolean;
    withManualSaveTableState?: boolean;
}

const CustomDataGridToolbar: React.FC<ICustomDataGridToolbarProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();
    const [initialState, setInitialState] = React.useState<GridInitialState>();

    useEffect(() => {
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

    const onSaveTableState = React.useCallback(() => {
        if (apiRef?.current?.exportState && localStorage) {
            const currentState = apiRef.current.exportState();
            localStorage.setItem('dataGridState', JSON.stringify(currentState));
        }
    }, [apiRef]);

    React.useLayoutEffect(() => {
        if (props.withAutoSaveTableState || props.withManualSaveTableState) {
            const stateFromLocalStorage = localStorage?.getItem('dataGridState');
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
        setIsDirty(false);
    };

    return (
        <Stack alignItems={'start'} direction={'row'} justifyContent={'space-between'}>
            <Stack alignItems={'start'}>
                <Stack alignItems={'start'} direction={'row'} justifyContent={'space-between'}>
                    <Button
                        className={cx(classes.filterOptionButton)}
                        endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        onClick={() => setIsOpen(!isOpen)}
                        variant='text'
                    >
                        {isOpen ? 'Hide' : 'Show'} table utilities
                    </Button>
                    {isOpen && props.withManualSaveTableState && <Button {...rootProps.slotProps?.baseButton}>Save table state</Button>}
                </Stack>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    <GridToolbarContainer>
                        <GridToolbarColumnsButton />
                        <GridToolbarFilterButton />
                        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                        <Button
                            aria-label={'Reset table controls'}
                            startIcon={<RestartAlt />}
                            variant={'text'}
                            disabled={!isDirty}
                            onClick={onClickReset}
                        >
                            Reset
                        </Button>
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
        color: theme.palette.grey[900],
        fontWeight: 'bold',
        textTransform: 'none',
    },
}));

export { CustomDataGridToolbar };
