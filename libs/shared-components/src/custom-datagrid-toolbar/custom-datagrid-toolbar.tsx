import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Collapse, Stack } from '@mui/material';
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { KeyboardArrowDown, KeyboardArrowUp, RestartAlt } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomDataGridToolbarProps {}

const CustomDataGridToolbar: React.FC<ICustomDataGridToolbarProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    return (
        <Stack alignItems={'start'} direction={'row'} justifyContent={'space-between'}>
            <Stack alignItems={'start'}>
                <Button
                    className={cx(classes.filterOptionButton)}
                    endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    onClick={() => setIsOpen(!isOpen)}
                    variant='text'
                >
                    {isOpen ? 'Hide' : 'Show'} table utilities
                </Button>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    <GridToolbarContainer>
                        <GridToolbarColumnsButton />
                        <GridToolbarFilterButton />
                        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                        <Button
                            aria-label={'Reset table controls'}
                            startIcon={<RestartAlt />}
                            variant={'text'}
                            /*             disabled={!isDirty}
              onClick={onClickReset}*/
                        >
                            Reset
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <GridToolbarExport
                            slotProps={{
                                tooltip: { title: 'Export data' },
                                button: { variant: 'outlined' },
                            }}
                        />
                    </GridToolbarContainer>
                </Collapse>
            </Stack>
        </Stack>
    );
};

const useStyles = makeStyles<ICustomDataGridToolbarProps>()((theme, props) => ({
    filterOptionButton: {
        color: theme.palette.grey[900],
        fontWeight: 'bold',
        textTransform: 'none',
    },
}));

export { CustomDataGridToolbar };
