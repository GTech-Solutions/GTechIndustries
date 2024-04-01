import React from 'react';
import { GtechIndustriesLayout } from '../gtech-industries-layout/gtech-industries-layout';
import { CustomDataGrid, LayoutRoute } from '@gtech/shared-components';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { routeUrls } from './routeUrls';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoutesProps {}

const Routes: React.FC<IRoutesProps> = (props) => {
    return (
        <RouterRoutes>
            <Route path={'/'} element={<LayoutRoute layoutComponent={GtechIndustriesLayout} />}>
                <Route path={routeUrls.dataGrid} element={<CustomDataGrid />} />
            </Route>
        </RouterRoutes>
    );
};

export { Routes };
