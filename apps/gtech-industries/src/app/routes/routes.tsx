import React from 'react';
import { GtechIndustriesLayout } from '../gtech-industries-layout/gtech-industries-layout';
import { CustomDataGrid, LayoutRoute, tableIdentifiers } from '@gtech/shared-components';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { routeUrls } from './routeUrls';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoutesProps {}

const Routes: React.FC<IRoutesProps> = (props) => {
    return (
        <RouterRoutes>
            <Route path={'/'} element={<LayoutRoute layoutComponent={GtechIndustriesLayout} />}>
                <Route
                    path={routeUrls.dataGridAutoSave}
                    element={<CustomDataGrid dataGridIdentifier={tableIdentifiers.dataGridAutoSave} withAutoSaveTableState={true} />}
                />
                <Route
                    path={routeUrls.dataGridManualSave}
                    element={<CustomDataGrid dataGridIdentifier={tableIdentifiers.dataGridManualSave} withManualSaveTableState={true} />}
                />
            </Route>
        </RouterRoutes>
    );
};

export { Routes };
