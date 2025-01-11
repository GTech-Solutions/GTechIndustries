import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CustomDataGrid, dataGridIdentifiers } from '@gtech/shared-components';
import {
    DataGridPro,
    DataGridProProps,
    GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
    GridRenderCellParams,
    useGridApiContext,
    useGridSelector,
    gridDetailPanelExpandedRowsContentCacheSelector,
    GridPinnedRowsProp,
    GridRowModel,
} from '@mui/x-data-grid-pro';
import { Ec2DetailPanel } from '../ec2-detail-panel/ec2-detail-panel';
import { DetailPanelDataCache } from './detail-data-panel-cache';
import { Box, IconButton, Portal, Stack, Typography } from '@mui/material';
import { Computer, ExpandMore, Storage } from '@mui/icons-material';
import { flushSync } from 'react-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResourcesDatagridProps {}
const pinnedRowDetialHeight = 300;
let numPinnedRowsExpanded = 0;

function getDetailPanelContentCustom(params: GridRowModel) {
    switch (params.resourceType) {
        case 'EC2':
            return <Ec2DetailPanel row={params} />;
        default:
            return null;
    }
}

function PinnedRowDetailPanelContainer({ row, height }: { row: any; height: string | number }) {
    return (
        <Box
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            sx={{
                height,
                overflow: 'auto',
                position: 'absolute',
                width: '100%',
                backgroundColor: 'white',
                top: '52px',
            }}
        >
            {getDetailPanelContentCustom(row)}
        </Box>
    );
}

const getDetailPanelContentPinned = ({ row }: any) => <PinnedRowDetailPanelContainer height={`${pinnedRowDetialHeight}px`} row={row} />;

function CustomDetailPanelToggle(props: Pick<GridRenderCellParams, 'id' | 'value'>) {
    const { id, value: isExpanded } = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const apiRef = useGridApiContext();
    const handleClick = (ref: any) => {
        setAnchorEl(ref);
    };
    const updateState = () => {
        flushSync(() =>
            apiRef.current.setState((prev) => {
                prev.rowsMeta.positions[0] += numPinnedRowsExpanded * pinnedRowDetialHeight;
                return {
                    ...prev,
                    rowsMeta: {
                        currentPageTotalHeight: prev.rowsMeta.currentPageTotalHeight + numPinnedRowsExpanded * pinnedRowDetialHeight,
                        positions: prev.rowsMeta.positions,
                    },
                };
            })
        );
        apiRef.current.forceUpdate();
    };
    const open = Boolean(anchorEl);

    // To avoid calling ´getDetailPanelContent` all the time, the following selector
    // gives an object with the detail panel content for each row id.
    const contentCache = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);

    // If the value is not a valid React element, it means that the row has no detail panel.
    const hasDetail = React.isValidElement(contentCache[id]);
    const rowParms = React.useMemo(() => apiRef.current.getRowParams(id), [id]);
    return (
        <IconButton
            size='small'
            tabIndex={-1}
            aria-label={isExpanded ? 'Close' : 'Open'}
            onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const ids = apiRef.current.getExpandedDetailPanels();
                flushSync(() => apiRef.current.setExpandedDetailPanels(ids.includes(id) ? ids.filter((rowId) => rowId !== id) : [...ids, id]));
                if (!hasDetail) {
                    if (!isExpanded) {
                        numPinnedRowsExpanded += 1;
                    } else {
                        numPinnedRowsExpanded -= 1;
                    }

                    const containerRef = document.querySelector('#main-container') as any;

                    const row = apiRef.current.getRowElement(id);
                    if (row) {
                        row.style.marginBottom = !isExpanded ? `${pinnedRowDetialHeight}px ` : '0px';

                        row.style.position = 'relative';
                        handleClick(!isExpanded ? row : undefined);
                    }
                    if (containerRef) {
                        containerRef.style.height = `${
                            !isExpanded ? containerRef.clientHeight + pinnedRowDetialHeight : containerRef.clientHeight - pinnedRowDetialHeight
                        }px`;
                    }
                    updateState();
                } else {
                    updateState();
                }
            }}
        >
            <ExpandMore
                sx={{
                    transform: `rotateZ(${isExpanded ? 180 : 0}deg)`,
                    transition: (theme) =>
                        theme.transitions.create('transform', {
                            duration: theme.transitions.duration.shortest,
                        }),
                }}
                fontSize='inherit'
            />
            {open && <Portal container={anchorEl}>{getDetailPanelContentPinned(rowParms)}</Portal>}
        </IconButton>
    );
}

const ResourcesDatagrid: React.FC<IResourcesDatagridProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [loading, setLoading] = React.useState<boolean>(false);
    const detailPanelDataCache = React.useContext(DetailPanelDataCache);

    const getResourceIcon = (resourceType: string) => {
        switch (resourceType) {
            case 'EC2':
                return <Computer />;
            case 'RDS':
                return <Storage />;
            default:
                return null;
        }
    };

    const columns = [
        {
            ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
            renderCell: (params: GridRenderCellParams) => <CustomDetailPanelToggle id={params.id} value={params.value} />,
        },
        {
            field: 'resourceType',
            headerName: 'Resource Type',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Stack height={'100%'} direction={'row'} spacing={1} alignItems={'center'} justifyItems={'center'}>
                        {getResourceIcon(params.value)}
                        <Typography>{params.value}</Typography>
                    </Stack>
                );
            },
        },
        {
            field: 'resources',
            headerName: 'Resources',
            flex: 1,
        },
        { field: 'cost', headerName: 'Cost', flex: 1 },
    ];

    const rows = [
        {
            id: 1,
            resourceType: 'EC2',
            resources: '10',
            cost: '$100',
        },
        {
            id: 2,
            resourceType: 'RDS',
            resources: '5',
            cost: '$50',
        },
    ];

    const pinnedRows: GridPinnedRowsProp = {
        top: rows,
    };

    const handleDetailPanelExpansionChange = React.useCallback<NonNullable<DataGridProProps['onDetailPanelExpandedRowIdsChange']>>(
        (newExpandedRowIds) => {
            // Only keep cached data for detail panels that are still expanded
            const preservedEntries = newExpandedRowIds.map((id) => [id, detailPanelDataCache.get(id)]);
            detailPanelDataCache.clear();
            preservedEntries.forEach(([id, value]) => value && detailPanelDataCache.set(id, value));
        },
        [detailPanelDataCache]
    );

    const getDetailPanelContent = React.useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(
        ({ row }) => getDetailPanelContentCustom(row),
        []
    );

    return (
        <DataGridPro
            pinnedRows={pinnedRows}
            loading={loading}
            columns={columns}
            rows={rows}
            getDetailPanelContent={getDetailPanelContent}
            getDetailPanelHeight={({ row }) => 'auto'}
            onDetailPanelExpandedRowIdsChange={handleDetailPanelExpansionChange}
        />
    );
};

const useStyles = makeStyles<IResourcesDatagridProps>()((theme, props) => ({}));

export { ResourcesDatagrid };
