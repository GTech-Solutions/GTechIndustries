import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useDemoData } from '@mui/x-data-grid-generator';
import {
    DataGridPro,
    DEFAULT_GRID_AUTOSIZE_OPTIONS,
    GridColumnVisibilityModel,
    GridDensity,
    GridInitialState,
    GridLogicOperator,
    GridPaginationModel,
    useGridApiRef,
} from '@mui/x-data-grid-pro';
import { DataGridProProps } from '@mui/x-data-grid-pro/models/dataGridProProps';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/vanilla/utils';

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
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({ page: 0, pageSize: 15 });
    const dataGridDensity = useMemo(
        () => atomWithStorage<GridDensity>(`${props.dataGridIdentifier}-density`, 'standard', undefined, { getOnInit: true }),
        [props.dataGridIdentifier, props.withAutoSaveTableState, props.withManualSaveTableState]
    );
    const [density, setDensity] = useAtom(dataGridDensity);

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
            density={density}
            onDensityChange={(newDensity) => setDensity(newDensity)}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            apiRef={apiRef}
            autosizeOnMount
            autosizeOptions={autosizeOptions}
            initialState={{
                pagination: { paginationModel: { page: paginationModel.page, pageSize: paginationModel.pageSize } },
            }}
            slotProps={{
                toolbar: {
                    dataGridIdentifier: props.dataGridIdentifier,
                    withAutoSaveTableState: props.withAutoSaveTableState,
                    withManualSaveTableState: props.withManualSaveTableState,
                    defaultHiddenColumns: props.defaultHiddenColumns,
                    dataGridDensity: dataGridDensity,
                    ...props.slotProps?.toolbar,
                },
                pagination: {
                    showFirstButton: true,
                    showLastButton: true,
                    page: paginationModel?.page,
                    rowsPerPage: paginationModel?.pageSize,
                    ...props.slotProps?.pagination,
                },
            }}
            pagination
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
