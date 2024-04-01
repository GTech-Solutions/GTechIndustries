import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro, GridColDef, DEFAULT_GRID_AUTOSIZE_OPTIONS, useGridApiRef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomDataGridProps {
    dataGridIdentifier: string;
    withAutoSaveTableState?: boolean;
    withManualSaveTableState?: boolean;
}

const CustomDataGrid: React.FC<ICustomDataGridProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const apiRef = useGridApiRef();
    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 8,
    });

    const autosizeOptions = {
        includeHeaders: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeHeaders,
        includeOutliers: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeOutliers,
        outliersFactor: parseFloat(Number(DEFAULT_GRID_AUTOSIZE_OPTIONS.outliersFactor).toFixed(2)),
        expand: true,
    };

    return (
        <DataGridPro
            apiRef={apiRef}
            {...data}
            autosizeOnMount
            autosizeOptions={autosizeOptions}
            autoPageSize
            initialState={{
                columns: {
                    columnVisibilityModel: { id: false },
                },
                pinnedColumns: { left: ['id'], right: ['Is Filled'] },
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            slotProps={{
                toolbar: {
                    dataGridIdentifier: props.dataGridIdentifier,
                    withAutoSaveTableState: props.withAutoSaveTableState,
                    withManualSaveTableState: props.withManualSaveTableState,
                },
            }}
            loading={loading}
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
