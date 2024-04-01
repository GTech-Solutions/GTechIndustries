import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers } from '@gtech/shared-components';
import { useDemoData } from '@mui/x-data-grid-generator';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAutoSaveDataGridControllerProps {}

const AutoSaveDataGridController: React.FC<IAutoSaveDataGridControllerProps> = (props) => {
    const { classes, cx } = useStyles(props);

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 8,
    });

    return (
        <CustomDataGrid
            loading={loading}
            columns={data.columns}
            rows={data.rows}
            dataGridIdentifier={dataGridIdentifiers.dataGridAutoSave}
            withAutoSaveTableState
        />
    );
};

const useStyles = makeStyles<IAutoSaveDataGridControllerProps>()((theme, props) => ({}));

export { AutoSaveDataGridController };
