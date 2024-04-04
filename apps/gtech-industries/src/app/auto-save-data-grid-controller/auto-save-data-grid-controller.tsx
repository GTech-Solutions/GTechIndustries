import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers, renderDataGridPercentageBar } from '@gtech/shared-components';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';

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
            flex: 1,
        },
        {
            field: 'commodity',
            headerName: 'Commodity',
            flex: 1,
            editable: false,
        },
        {
            field: 'traderName',
            headerName: 'Trader Name',
            flex: 1,
            editable: false,
        },
        {
            field: 'traderEmail',
            headerName: 'Trader Email',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <a className={cx(classes.email)} href={`mailto:${params.value}`}>
                        {params.value}
                    </a>
                );
            },
            editable: false,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            flex: 1,
            editable: false,
        },
        {
            field: 'filledQuantity',
            headerName: 'Filled Quantity',
            type: 'number',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => renderDataGridPercentageBar({ value: params.value }),
            editable: false,
        },
        {
            field: 'isFilled',
            headerName: 'Is Filled',
            align: 'center',
            type: 'boolean',
            flex: 1,
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

const useStyles = makeStyles<IAutoSaveDataGridControllerProps>()((theme, props) => ({
    email: {
        color: 'black',
    },
}));

export { AutoSaveDataGridController };
