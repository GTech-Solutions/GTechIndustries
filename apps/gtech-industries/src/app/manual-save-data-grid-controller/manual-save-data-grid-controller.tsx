import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers } from '@gtech/shared-components';
import {
    randomColor,
    randomEmail,
    randomId,
    randomName,
    randomRating,
    randomTraderName,
    randomUrl,
    randomUserName,
    useDemoData,
} from '@mui/x-data-grid-generator';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Avatar, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IManualSaveDataGridControlllerProps {}

const ManualSaveDataGridController: React.FC<IManualSaveDataGridControlllerProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState<any[]>([]);

    useEffect(() => {
        const rows = [];

        for (let i = 0; i < 5000; i++) {
            rows.push({
                id: randomId(),
                avatar: randomColor(),
                name: randomTraderName(),
                website: randomUrl(),
                rating: randomRating(),
                email: randomEmail(),
            });
        }

        setData(rows);
        setIsLoading(false);
    }, []);

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
            rows={data}
            loading={isLoading}
            withManualSaveTableState
        />
    );
};

const useStyles = makeStyles<IManualSaveDataGridControlllerProps>()((theme, props) => ({
    linkTextColor: {
        color: theme.palette.mode === 'light' ? 'black' : '#FFF',
    },
}));

export { ManualSaveDataGridController };
