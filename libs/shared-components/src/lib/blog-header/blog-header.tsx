import { IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBlogHeaderProps {
    title: string;
}

const BlogHeader: React.FC<IBlogHeaderProps> = (props) => {
    const { classes, cx } = useStyles(props);

    return (
        <>
            <Toolbar className={cx(classes.toolbar)}>
                <Typography component='h2' variant='h5' color='inherit' align='center' noWrap className={cx(classes.title)}>
                    {props.title}
                </Typography>
            </Toolbar>
        </>
    );
};

const useStyles = makeStyles<IBlogHeaderProps>()((theme, props) => ({
    toolbar: {
        borderBottom: 1,
        borderColor: 'divider',
    },
    title: {
        flex: 1,
    },
}));

export { BlogHeader };
