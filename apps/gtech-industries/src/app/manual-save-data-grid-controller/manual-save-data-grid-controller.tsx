import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers } from '@gtech/shared-components';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Avatar, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IManualSaveDataGridControlllerProps {}

const ManualSaveDataGridController: React.FC<IManualSaveDataGridControlllerProps> = (props) => {
    const { classes, cx } = useStyles(props);

    const { data, loading } = useDemoData({
        dataSet: 'Employee',
        rowLength: 5000,
        maxColumns: 6,
    });

    const columns: GridColDef<any>[] = [
        {
            field: 'id',
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            display: 'flex',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            renderCell: (params) => {
                return (
                    <>
                        <Avatar sx={{ backgroundColor: params.row.avatar }}>{params.row.name[0]}</Avatar>
                    </>
                );
            },
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: true,
            groupable: false,
            aggregable: false,
        },
        {
            field: 'website',
            headerName: 'Website',
            flex: 1,
            editable: true,
            groupable: false,
            aggregable: false,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Link className={cx(classes.linkTextColor)} to={params.value}>
                        {params.value}
                    </Link>
                );
            },
        },
        {
            field: 'rating',
            headerName: 'Rating',
            flex: 1,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            availableAggregationFunctions: ['avg', 'min', 'max', 'size'],
            renderCell: (params: GridRenderCellParams) => {
                return <Rating name='rating' value={params.value} />;
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <a className={cx(classes.linkTextColor)} href={`mailto:${params.value}`}>
                        {params.value}
                    </a>
                );
            },
            editable: true,
        },
    ];

    return (
        <CustomDataGrid
            defaultHiddenColumns={{ id: false }}
            dataGridIdentifier={dataGridIdentifiers.dataGridManualSave}
            columns={columns}
            rows={data.rows}
            loading={loading}
            withManualSaveTableState
        />
    );
};

const useStyles = makeStyles<IManualSaveDataGridControlllerProps>()((theme, props) => ({
    linkTextColor: {
        color: 'black',
    },
}));

export { ManualSaveDataGridController };
