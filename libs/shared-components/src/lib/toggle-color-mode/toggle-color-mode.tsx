import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IToggleColorModeProps {
    mode: string;
    toggleColorMode: () => void;
}

const ToggleColorMode: React.FC<IToggleColorModeProps> = (props) => {
    const { classes, cx } = useStyles(props);

    return (
        <Box className={cx(classes.box)}>
            <Button
                variant='text'
                onClick={props.toggleColorMode}
                size='small'
                aria-label='button to toggle theme'
                sx={{ minWidth: '32px', height: '32px', p: '4px' }}
            >
                {props.mode === 'dark' ? <WbSunnyRoundedIcon fontSize='small' /> : <ModeNightRoundedIcon fontSize='small' />}
            </Button>
        </Box>
    );
};

const useStyles = makeStyles<IToggleColorModeProps>()((theme, props) => ({
    box: { maxWidth: '32px' },
    button: { minWidth: '32px', height: '32px', padding: '4px' },
}));

export { ToggleColorMode };
