import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers } from '@gtech/shared-components';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GridColDef } from '@mui/x-data-grid-pro';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAutoSaveDataGridControllerProps {}

const AutoSaveDataGridController: React.FC<IAutoSaveDataGridControllerProps> = (props) => {
    const { classes, cx } = useStyles(props);

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 500,
        maxColumns: 8,
    });

    const columns: GridColDef<any>[] = [
        {
            field: 'id',
        },
        {
            field: 'desk',
            headerName: 'Desk',
            width: 110,
        },
        {
            field: 'commodity',
            headerName: 'Commodity',
            width: 180,
            editable: false,
        },
        {
            field: 'traderName',
            headerName: 'Trader Name',
            width: 120,
            editable: false,
        },
        {
            field: 'traderEmail',
            headerName: 'Trader Email',
            width: 150,
            editable: false,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 140,
            editable: false,
        },
        {
            field: 'filledQuantity',
            headerName: 'Filled Quantity',
            type: 'number',
            width: 120,
            editable: false,
        },
        {
            field: 'isFilled',
            headerName: 'Is Filled',
            align: 'center',
            type: 'boolean',
            width: 80,
            editable: false,
        },
    ];

    return (
        <CustomDataGrid
            defaultHiddenColumns={{ id: false }}
            loading={loading}
            columns={columns}
            rows={data.rows}
            dataGridIdentifier={dataGridIdentifiers.dataGridAutoSave}
            withAutoSaveTableState
        />
    );
};

const useStyles = makeStyles<IAutoSaveDataGridControllerProps>()((theme, props) => ({}));

export { AutoSaveDataGridController };
