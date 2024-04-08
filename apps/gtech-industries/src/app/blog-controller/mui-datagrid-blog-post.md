# Creating a Custom Data Grid Toolbar with React Material-UI and TSS
*Written by Michael Gilge*

Data grids are essential components in web applications for displaying and managing large sets of data. However, providing users with the ability to customize and manage the state of these grids can be challenging. In this article, we'll explore how to create a custom data grid toolbar using React, Jotai, Material-UI (MUI), and TSS (Type-Safe Styling). Our custom toolbar will allow users to efficiently manage filters, sorting, and other settings while also providing options for saving and restoring the state of the data grid.

## Prerequisites

Before we dive into building our custom data grid toolbar, let's ensure we have all the necessary tools and dependencies installed:

- **Node.js and npm**: Make sure you have Node.js and npm installed on your system. You can download and install them from the [official website](https://nodejs.org/).

  - **React, Material-UI and Jotai**: Our custom toolbar will be built using React for the frontend, Jotai for state management and Material-UI for the UI components. Install React, Jotai, and Material-UI in your project using npm:

```bash
npm install react jotai @mui/material @emotion/react @emotion/styled 
```

- **TSS for Type-Safe Styling**: We'll use TSS for type-safe styling in our React components. Install TSS in your project using npm:

```bash
npm install tss-react
```

With these prerequisites in place, we're ready to start building our custom data grid toolbar.

## Setting Up the Component

Let's start by defining the structure and functionality of our custom data grid toolbar component. We'll name it `CustomDataGridToolbar`.

```javascript
// Import necessary dependencies
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

// Define props for the custom data grid toolbar
export type ICustomDataGridToolbarProps = GridSlotProps['toolbar'] & {
  dataGridIdentifier: string;
  withAutoSaveTableState?: boolean;
  withManualSaveTableState?: boolean;
  defaultHiddenColumns?: GridColumnVisibilityModel;
  dataGridDensity: WritableAtom<GridDensity, any, void>;
};

// Define the component
const CustomDataGridToolbar: React.FC<ICustomDataGridToolbarProps> = (props) => {
  // Component logic goes here
};

// Define the styles for the component
const useStyles = makeStyles<ICustomDataGridToolbarProps>()((theme, props) => ({
  filterOptionButton: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    textTransform: 'none',
  },
}));

// Export the component and its styles
export { CustomDataGridToolbar, useStyles };

// Integrate the custom toolbar into the theme options
function useTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiDataGrid: {
        defaultProps: {
          pageSizeOptions: [15, 25, 50, 100],
          density: 'standard',
          slots: {
            toolbar: CustomDataGridToolbar as GridSlotsComponent['toolbar'],
          },
        },
      },
    },
  };
}
```

Our custom data grid toolbar component imports necessary dependencies from Material-UI and sets up the props interface to define the toolbar's behavior.  These props can be specified on the DataGrids slotprops to override this component on a DataGrid by DataGrid basis.  The component itself is plumbed into slots in the MUI theme for Datagrid component overrides.

## Component Logic

Now, let's dive into the logic of our `CustomDataGridToolbar` component. We'll handle state management, saving and restoring table state, and rendering the toolbar UI elements.

```javascript
// Define the component
const CustomDataGridToolbar: React.FC<ICustomDataGridToolbarProps> = (props) => {
    // Declare state variables using hooks
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();
    const LOCAL_STORAGE_KEY = `dataGridState-${props.dataGridIdentifier}`;
    
    //Saving desnity in jotai atom and local storage
    const density = useAtomValue(props.dataGridDensity);
    
    // Save the initial state of the data grid in local storage using Jotai
    const dataGridStateAtom = useMemo(
        () => atomWithStorage<GridInitialState>(LOCAL_STORAGE_KEY, {}, undefined, { getOnInit: true }),
        [props.dataGridIdentifier, props.withAutoSaveTableState, props.withManualSaveTableState]
    );
    
    const [initialState, setInitialState] = useAtom(dataGridStateAtom);

    // Subscribe to events for state changes and to handle changing isDirty state
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

    // Effect to check if state is dirty and handle initial state if present
    useEffect(() => {
        if (initialState !== undefined) {
            const isInitialStateEqualToDefault = checkIfStateIsDirty(initialState);
            const isRootPropsInitialStateEqualToDefault = checkIfStateIsDirty(rootProps.initialState ?? {});

            (!isInitialStateEqualToDefault || !isRootPropsInitialStateEqualToDefault) && setIsOpen(true);
            setIsDirty(!isInitialStateEqualToDefault || !isRootPropsInitialStateEqualToDefault);
        }
    }, [initialState, rootProps.initialState, props.defaultHiddenColumns]);

    // Function to check if state is dirty
    const checkIfStateIsDirty = (stateToCheck: GridInitialState) => {
        // Turn initial state into defaultDataGridControl
        const initialStateAsDefault = {
            paginationModel: stateTo

Check?.pagination?.paginationModel ?? defaultDataGridControl.paginationModel,
            filterModel: stateToCheck?.filter?.filterModel ?? defaultDataGridControl.filterModel,
            columnModel:
                stateToCheck?.columns?.columnVisibilityModel ?? props.defaultHiddenColumns
                    ? props.defaultHiddenColumns
                    : defaultDataGridControl.columnModel,
            density: stateToCheck?.density ?? defaultDataGridControl.density,
            sortModel: stateToCheck?.sorting?.sortModel ?? defaultDataGridControl.sortModel,
        };

        // Check if initial state is equal to defaultDataGridControl with props.defaultHiddenColumns as columnModel
        const isInitialStateEqualToDefault =
            JSON.stringify(initialStateAsDefault) ===
            JSON.stringify({
                ...defaultDataGridControl,
                columnModel: props.defaultHiddenColumns ? props.defaultHiddenColumns : defaultDataGridControl.columnModel,
            });

        return isInitialStateEqualToDefault;
    };

    // Function to handle saving table state
    const onSaveTableState = React.useCallback(() => {
        if (apiRef?.current?.exportState && localStorage) {
            const currentState = apiRef.current.exportState();
            setInitialState(currentState);
        }
    }, []);

    // Effect to handle automatic saving of table state
    useLayoutEffect(() => {
        if (props.withAutoSaveTableState || props.withManualSaveTableState) {
            apiRef.current.setDensity(density);
            apiRef.current.restoreState(initialState);
        }

        //Using visibilitychange event to save state when user switches tabs important to use this instead of beforeunload to support mobile
        if (props.withAutoSaveTableState) {
            window.addEventListener('visibilitychange', onSaveTableState);

            return () => {
                window.removeEventListener('visibilitychange', onSaveTableState);
                onSaveTableState();
            };
        }
    }, [onSaveTableState]);

    // Function to handle manual reset of table controls
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

    // Render the toolbar UI
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
```

In this section, we've set up the logic of our custom data grid toolbar component. We've used various React hooks (`useState`, `useEffect`, `useMemo`, `useLayoutEffect`) to manage state, subscribe to events for detecting changes in state, and handle saving and restoring table state.  The most important of these is thr useLayoutEffect which sets up the actual saving of thr table state.

## Styling the Component

Finally, let's add some custom styling to our toolbar component using Material-UI's `makeStyles` function and TSS.

```javascript
// Define the styles for the component
const useStyles = makeStyles<ICustomDataGridToolbarProps>()((theme, props) => ({
    filterOptionButton: {
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        textTransform: 'none',
    },
}));

// Export the component and its styles
export { CustomDataGridToolbar, useStyles };
```

With the `makeStyles` function, we ensure type-safe styling and class re-usability with TSS, while maintaining flexibility in styling our component.

## Conclusion

In this article, we've explored how to create a custom data grid toolbar component using React, Material-UI, and TSS. We've covered the component's structure, logic for saving and restoring table state, and styling. With this component, you can provide users with a powerful and intuitive interface for managing data grid settings.

Feel free to customize and expand upon this component to suit your specific needs and requirements in your React applications.

---

[Click here](https://mui.gtechdirect.com/datagridautosave) to see the live example.

