import React, { useEffect, useLayoutEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro, DEFAULT_GRID_AUTOSIZE_OPTIONS, GridColumnVisibilityModel, useGridApiRef } from '@mui/x-data-grid-pro';
import { DataGridProProps } from '@mui/x-data-grid-pro/models/dataGridProProps';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomDataGridProps extends DataGridProProps {
    dataGridIdentifier: string;
    withAutoSaveTableState?: boolean;
    withManualSaveTableState?: boolean;
    defaultHiddenColumns?: GridColumnVisibilityModel;
}

const CustomDataGrid: React.FC<ICustomDataGridProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const apiRef = useGridApiRef();

    useLayoutEffect(() => {
        if (apiRef.current && props.defaultHiddenColumns) {
            apiRef.current.setColumnVisibilityModel(props.defaultHiddenColumns);
        }
    }, [props.defaultHiddenColumns]);

    const autosizeOptions = {
        includeHeaders: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeHeaders,
        includeOutliers: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeOutliers,
        outliersFactor: parseFloat(Number(DEFAULT_GRID_AUTOSIZE_OPTIONS.outliersFactor).toFixed(2)),
        expand: true,
    };

    return (
        <DataGridPro
            {...props}
            apiRef={apiRef}
            autosizeOnMount
            autosizeOptions={autosizeOptions}
            autoPageSize
            initialState={{
                pinnedColumns: { left: ['id'], right: ['Is Filled'] },
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            slotProps={{
                toolbar: {
                    dataGridIdentifier: props.dataGridIdentifier,
                    withAutoSaveTableState: props.withAutoSaveTableState,
                    withManualSaveTableState: props.withManualSaveTableState,
                    defaultHiddenColumns: props.defaultHiddenColumns,
                },
            }}
        />
    );
};

const useStyles = makeStyles<ICustomDataGridProps>()((theme, props) => ({
    dataGridContainer: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#fff',
    },
}));

export { CustomDataGrid };
