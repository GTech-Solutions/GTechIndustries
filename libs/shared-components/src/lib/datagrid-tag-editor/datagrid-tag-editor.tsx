import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { GridRowId, useGridApiContext } from '@mui/x-data-grid-pro';
import { TagEditor } from '@cloudscape-design/components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDatagridTagEditorProps {
    id: GridRowId;
    field: string;
    value?: any[];
    colDef: any;
    hasFocus: boolean;
    resourceId: string;
    name: string;
}

const DatagridTagEditor: React.FC<IDatagridTagEditorProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const { id, field, value, colDef, hasFocus } = props;
    const [valueState, setValueState] = React.useState(value);
    const apiRef = useGridApiContext();
    const [isOpen, setIsOpen] = React.useState(true);

    const onChangeTags = (tags: readonly any[]) => {
        setValueState([...tags]);
    };

    const handleClose = (shouldSave: boolean) => {
        //API call to save the tags
        shouldSave && apiRef.current.setEditCellValue({ id, field, value: valueState, debounceMs: 200 });
        //Hack to fix value not showing when closing the dialog
        apiRef.current.setCellFocus(id, 'taco');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen}>
            <DialogTitle id='alert-dialog-title'>
                <Stack
                    direction='row'
                    spacing={2}
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant={'h5'}>{props.id}</Typography>
                    <Typography variant={'h5'}>{props.name}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <TagEditor
                    i18nStrings={{
                        tagLimit: (availableTags, tagLimit) =>
                            availableTags === tagLimit
                                ? 'You can add up to ' + tagLimit + ' tags.'
                                : availableTags === 1
                                  ? 'You can add up to 1 more tag.'
                                  : 'You can add up to ' + availableTags + ' more tags.',
                    }}
                    tags={valueState}
                    onChange={({ detail }) => onChangeTags(detail.tags)}
                    keysRequest={() => Promise.resolve(['some-existing-key-3', 'some-existing-key-4', 'some-existing-key-5'])}
                    valuesRequest={(key, value) => (key ? Promise.resolve(['value 1', 'value-2', 'value-3']) : Promise.reject())}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
                <Button onClick={() => handleClose(true)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles<IDatagridTagEditorProps>()((theme, props) => ({}));

export { DatagridTagEditor };
