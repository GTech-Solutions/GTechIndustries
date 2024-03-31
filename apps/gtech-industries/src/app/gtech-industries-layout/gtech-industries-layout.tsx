import React from 'react';
import { CustomAppbar } from '@gtech/shared-components';
import { MenuItem, Typography } from '@mui/material';
import { GTechLogo } from '../images/svgs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGtechIndustriesLayoutProps {}

const GtechIndustriesLayout: React.FC<IGtechIndustriesLayoutProps> = (props) => {
    return (
        <CustomAppbar
            logo={GTechLogo}
            appbarProps={{ position: 'fixed' }}
            menuItems={[
                <MenuItem onClick={() => console.log('clicked')}>
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
    );
};

export { GtechIndustriesLayout };
