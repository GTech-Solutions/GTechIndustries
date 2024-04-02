import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers } from '@gtech/shared-components';
import { useDemoData } from '@mui/x-data-grid-generator';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IManualSaveDataGridControlllerProps {}

const ManualSaveDataGridController: React.FC<IManualSaveDataGridControlllerProps> = (props) => {
    const { classes, cx } = useStyles(props);

    const { data, loading } = useDemoData({
        dataSet: 'Employee',
        rowLength: 5000,
        maxColumns: 6,
    });

    return (
        <CustomDataGrid
            defaultHiddenColumns={{ id: false }}
            dataGridIdentifier={dataGridIdentifiers.dataGridManualSave}
            columns={data.columns}
            rows={data.rows}
            loading={loading}
            withManualSaveTableState
        />
    );
};

const useStyles = makeStyles<IManualSaveDataGridControlllerProps>()((theme, props) => ({}));

export { ManualSaveDataGridController };
