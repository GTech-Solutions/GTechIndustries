import React from 'react';
import { CustomAppbar } from '@gtech/shared-components';
import { MenuItem, Typography } from '@mui/material';
import { GTechLogo } from '../images/svgs';
import { useNavigate } from 'react-router-dom';

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
                    <MenuItem onClick={() => navigate('taco')}>
                        <Typography variant='body2' color='black'>
                            DataGrid
                        </Typography>
                    </MenuItem>,
                    <MenuItem onClick={() => console.log('clicked')}>
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
