import React from 'react';
import { CustomAppbar } from '@gtech/shared-components';
import { alpha, Box, Container, MenuItem, Typography } from '@mui/material';
import { GTechLogo } from '../images/svgs';
import { useNavigate } from 'react-router-dom';
import { routeUrls } from '../routes/routeUrls';
import { makeStyles } from 'tss-react/mui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGtechIndustriesLayoutProps extends React.PropsWithChildren {}

const GtechIndustriesLayout: React.FC<IGtechIndustriesLayoutProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const navigate = useNavigate();
    const [isMenuDrawerOpen, setIsMenuDrawerOpen] = React.useState(false);

    const handleMenuItemClick = (url: string) => {
        navigate(url);
        setIsMenuDrawerOpen(false);
    };

    return (
        <>
            <CustomAppbar
                isDrawerOpen={isMenuDrawerOpen}
                setShowDrawer={setIsMenuDrawerOpen}
                logo={GTechLogo}
                appbarProps={{ position: 'fixed' }}
                menuItems={[
                    <MenuItem key={routeUrls.dataGrid} onClick={() => handleMenuItemClick(routeUrls.dataGrid)}>
                        <Typography variant='body2' color='text.primary'>
                            DataGrid
                        </Typography>
                    </MenuItem>,
                    <MenuItem key={routeUrls.treeView} onClick={() => handleMenuItemClick(routeUrls.treeView)}>
                        <Typography variant='body2' color={'text.primary'}>
                            TreeView
                        </Typography>
                    </MenuItem>,
                ]}
            />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Box className={cx(classes.gradientBox)}>
                    <Container
                        maxWidth='xl'
                        className={cx(classes.container)}
                        sx={{
                            pt: { xs: 10, sm: 12 },
                            pb: { xs: 6, sm: 8 },
                        }}
                    >
                        <div className={cx(classes.dataGridContainer)}>{props.children}</div>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

const useStyles = makeStyles<IGtechIndustriesLayoutProps>()((theme, props) => ({
    gradientBox: {
        width: '100%',
        backgroundImage:
            theme.palette.mode === 'light' ? 'linear-gradient(180deg, #CEE5FD, #FFF)' : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dataGridContainer: {
        width: '100%',
        height: 'calc(100vh - 10rem)',
        backgroundColor: '#fff',
    },
}));

export { GtechIndustriesLayout };
