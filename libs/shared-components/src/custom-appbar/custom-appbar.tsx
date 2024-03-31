import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Box, Container, Toolbar, ToolbarProps } from '@mui/material';
import { AppBarProps } from '@mui/material/AppBar/AppBar';
import { ContainerProps } from '@mui/material/Container/Container';
import { ReactComponent } from 'tss-react/tools/ReactComponent';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomAppbarProps {
    appbarProps?: AppBarProps;
    containerProps?: ContainerProps;
    toolbarProps?: ToolbarProps;
    menuItems?: React.ReactNode[];
    logo: React.ElementType;
}

const CustomAppbar: React.FC<ICustomAppbarProps> = (props) => {
    const { classes, cx } = useStyles(props);

    const Logo = props.logo;
    return (
        <AppBar className={cx(classes.appBar)} {...props.appbarProps}>
            <Container {...props.containerProps} maxWidth='lg'>
                <Toolbar {...props.toolbarProps} className={cx(classes.toolBar)} variant='regular'>
                    <Box className={cx(classes.imageBox)}>
                        <Logo className={cx(classes.logoStyle)} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{props.menuItems?.map((menuItem) => menuItem)}</Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const useStyles = makeStyles<ICustomAppbarProps>()((theme, props) => ({
    appBar: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        marginTop: 2,
    },
    toolBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        borderRadius: '999px',
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(24px)',
        maxHeight: 40,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow:
            theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
    },
    imageBox: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '-18px',
        px: 0,
    },
    logoStyle: {
        width: '140px',
        height: 'auto',
        cursor: 'pointer',
    },
}));

export { CustomAppbar };
