import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { DataGridPro, gridClasses, GridRowModel } from '@mui/x-data-grid-pro';
import { randomArrayItem, randomCommodity, randomCountry, randomInt, randomPrice } from '@mui/x-data-grid-generator';
import { DetailPanelDataCache } from '../resources-datagrid/detail-data-panel-cache';
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import { CustomDataGrid, dataGridIdentifiers, JsonDialog, useStickyHeaders } from '@gtech/shared-components';
import { FilePresent } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEc2DetailPanelProps {
    row: GridRowModel;
}

async function getDetails(id: GridRowModel['id']) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    const quantity = randomInt(10, 50);
    return [...Array(quantity)].map((_, index) => ({
        id: `${id}-${index}`,
        name: randomCommodity(),
        region: randomArrayItem(['us-east-1', 'us-west-2', 'eu-west-1']),
        tags: ['tag1', 'tag2', 'tag3'],
        json: JSON.stringify({ key: 'value' }),
        cost: randomPrice(),
    }));
}

const Ec2DetailPanel: React.FC<IEc2DetailPanelProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [isLoading, setLoading] = React.useState(true);
    const [ec2s, setEc2s] = React.useState<Awaited<ReturnType<typeof getDetails>>>([]);
    const [isJsonDialogOpen, setIsJsonDialogOpen] = React.useState(false);

    const containerRef = React.useRef(null);
    useStickyHeaders({ containerRef, topOffset: 200, isDoneLoading: isLoading });

    const detailPanelDataCache = React.useContext(DetailPanelDataCache);

    React.useEffect(() => {
        let isMounted = true;
        (async () => {
            if (!detailPanelDataCache.has(props.row.id)) {
                const response = await getDetails(props.row.id);
                // Store the data in cache so that when detail panel unmounts due to virtualization, the data is not lost
                detailPanelDataCache.set(props.row.id, response);
            }
            const result = detailPanelDataCache.get(props.row.id);

            if (!isMounted) {
                return;
            }

            setEc2s(result);
            setLoading(false);
        })();

        return () => {
            isMounted = false;
        };
    }, [props.row.id, detailPanelDataCache]);

    return (
        <div style={{ height: '100%', left: 0, display: 'flex', flexDirection: 'column', width: '100%' }} ref={containerRef}>
            <CustomDataGrid
                dataGridIdentifier={dataGridIdentifiers.dataGridCloudGazeEc2}
                loading={isLoading}
                columns={[
                    { field: 'id', headerName: 'ID' },
                    {
                        field: 'name',
                        headerName: 'Name',
                        type: 'string',
                    },
                    { field: 'region', headerName: 'Region', type: 'string' },
                    {
                        field: 'tags',
                        headerName: 'Tags',
                        type: 'string',
                        valueGetter: (value, row) => row.tags.join(', '),
                    },
                    {
                        field: 'json',
                        headerName: 'JSON',
                        type: 'string',
                        renderCell: (params) => (
                            <Stack direction='row' alignItems='center'>
                                <JsonDialog json={params.value} isOpen={isJsonDialogOpen} onClose={() => setIsJsonDialogOpen(false)} />
                                <IconButton onClick={() => setIsJsonDialogOpen(true)}>
                                    <FilePresent />
                                </IconButton>
                                ,
                            </Stack>
                        ),
                    },
                    {
                        field: 'cost',
                        headerName: 'Cost',
                        type: 'string',
                        valueGetter: (value) => `$${value}`,
                    },
                ]}
                rows={ec2s}
            />
        </div>
    );
};

const useStyles = makeStyles<IEc2DetailPanelProps>()((theme, props) => ({}));

export { Ec2DetailPanel };
