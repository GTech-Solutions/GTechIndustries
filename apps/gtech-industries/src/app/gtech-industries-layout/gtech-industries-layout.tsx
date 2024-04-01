import React from 'react';
import { CustomAppbar } from '@gtech/shared-components';
import { MenuItem, Typography } from '@mui/material';
import { GTechLogo } from '../images/svgs';
import { useNavigate } from 'react-router-dom';
import { routeUrls } from '../routes/routeUrls';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGtechIndustriesLayoutProps extends React.PropsWithChildren {}

const GtechIndustriesLayout: React.FC<IGtechIndustriesLayoutProps> = (props) => {
    const navigate = useNavigate();

    return (
        <>
            <CustomAppbar
                logo={GTechLogo}
                appbarProps={{ position: 'fixed' }}
                menuItems={[
                    <MenuItem key={routeUrls.dataGrid} onClick={() => navigate(routeUrls.dataGrid)}>
                        <Typography variant='body2' color='black'>
                            DataGrid
                        </Typography>
                    </MenuItem>,
                    <MenuItem key={routeUrls.treeView} onClick={() => console.log('clicked')}>
                        <Typography variant='body2' color={'black'}>
                            TreeView
                        </Typography>
                    </MenuItem>,
                ]}
            />
            {props.children}
        </>
    );
};

export { GtechIndustriesLayout };
