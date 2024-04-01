import React, { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Box, Button, Container, Drawer, Toolbar, ToolbarProps } from '@mui/material';
import { AppBarProps } from '@mui/material/AppBar/AppBar';
import { ContainerProps } from '@mui/material/Container/Container';
import { ToggleColorMode } from '../toggle-color-mode/toggle-color-mode';
import { useAtom } from 'jotai';
import { themeColorMode } from '../atoms/atoms';
import { Menu, MenuBook } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomAppbarProps {
    appbarProps?: AppBarProps;
    containerProps?: ContainerProps;
    toolbarProps?: ToolbarProps;
    menuItems?: React.ReactNode[];
    logo: React.ElementType;
    isDrawerOpen: boolean;
    setShowDrawer: (value: boolean) => void;
}

const CustomAppbar: React.FC<ICustomAppbarProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const [mode, toggleColorMode] = useAtom(themeColorMode);

    const onChangeColorMode = () => {
        switch (mode) {
            case 'light':
                toggleColorMode('dark');
                break;
            case 'dark':
                toggleColorMode('light');
                break;
            default:
                toggleColorMode('light');
                break;
        }
    };

    const Logo = props.logo;

    return (
        <AppBar className={cx(classes.appBar)} {...props.appbarProps}>
            <Container {...props.containerProps} maxWidth='lg'>
                <Toolbar {...props.toolbarProps} className={cx(classes.toolBar)} variant='regular'>
                    <Box className={cx(classes.imageBox)}>
                        <Logo className={cx(classes.logoStyle)} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{props.menuItems}</Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                        }}
                        className={cx(classes.colorModeToggle)}
                    >
                        <ToggleColorMode mode={mode} toggleColorMode={onChangeColorMode} />
                    </Box>
                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button
                            variant='text'
                            color='primary'
                            aria-label='menu'
                            onClick={() => props.setShowDrawer(true)}
                            className={cx(classes.menuIconBox)}
                        >
                            <Menu />
                        </Button>
                        <Drawer anchor='right' open={props.isDrawerOpen} onClose={() => props.setShowDrawer(false)}>
                            <Box className={cx(classes.drawerContainerBox)}>
                                <Box className={cx(classes.drawerColorModeToggle)}>
                                    <ToggleColorMode mode={mode} toggleColorMode={onChangeColorMode} />
                                </Box>
                                {props.menuItems}
                            </Box>
                        </Drawer>
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
    drawerContainerBox: {
        minWidth: '60dvw',
        padding: 2,
        backgroundColor: 'background.paper',
        flexGrow: 1,
    },
    drawerColorModeToggle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        flexGrow: 1,
    },
    colorModeToggle: {
        gap: 0.5,
        alignItems: 'center',
    },
    menuIconBox: {
        minWidth: '30px',
        padding: '4px',
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
        marginLeft: 10,
        width: '50px',
        height: 'auto',
        cursor: 'pointer',
    },
}));

export { CustomAppbar };
