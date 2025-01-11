import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import ReactJson, { OnCopyProps } from 'react-json-view';
import { Close } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IJsonDialogProps {
    json: string;
    isOpen: boolean;
    onClose: () => void;
}

const JsonDialog: React.FC<IJsonDialogProps> = (props) => {
    const { classes, cx } = useStyles(props);

    const onHandleCopy = (copyProps: OnCopyProps) => {
        navigator.clipboard.writeText(JSON.stringify(copyProps.src, null, '\t'));
    };

    return (
        <Dialog fullWidth maxWidth={'md'} open={props.isOpen} onClose={props.onClose}>
            <IconButton aria-label='close' onClick={props.onClose} className={cx(classes.closeButton)}>
                <Close />
            </IconButton>
            <DialogContent>
                <ReactJson enableClipboard={onHandleCopy} src={JSON.parse(props.json)} />
            </DialogContent>
        </Dialog>
    );
};

const useStyles = makeStyles<IJsonDialogProps>()((theme, props) => ({
    closeButton: {
        position: 'absolute',
        right: 4,
        top: 4,
        color: theme.palette.grey[500],
    },
}));

export { JsonDialog };
