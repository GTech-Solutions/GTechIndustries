import React, { useRef } from 'react';
import { makeStyles } from 'tss-react/mui';
import CV from 'react-cv';
import { Resume } from './resume';
import { useReactToPrint } from 'react-to-print';
import { Button, Stack } from '@mui/material';
import { Email, Print } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResumeControllerProps {}

//https://github.com/sbayd/react-cv
const ResumeController: React.FC<IResumeControllerProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const componentRef = useRef<any>();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current ?? null,
    });

    return (
        <Stack spacing={0} direction='column' justifyContent='flex-start' alignItems='center'>
            <Stack spacing={0} direction='row' justifyContent='center' alignItems='center'>
                <Button startIcon={<Print />} className={cx(classes.printButton)} variant={'text'} onClick={handlePrint}>
                    Print
                </Button>
                <Button startIcon={<Email />} className={cx(classes.printButton)} variant={'text'} href={`mailto:mgilge@gmail.com`}>
                    Contact
                </Button>
            </Stack>
            <Resume ref={componentRef} />
        </Stack>
    );
};

const useStyles = makeStyles<IResumeControllerProps>()((theme, props) => ({
    printButton: {
        maxWidth: 200,
    },
}));

export { ResumeController };
