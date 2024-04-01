import React from 'react';
import { GtechIndustriesLayout } from '../gtech-industries-layout/gtech-industries-layout';
import { CustomDataGrid, LayoutRoute, dataGridIdentifiers } from '@gtech/shared-components';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import { routeUrls } from './routeUrls';
import { AutoSaveDataGridController } from '../auto-save-data-grid-controller/auto-save-data-grid-controller';
import { ManualSaveDataGridController } from '../manual-save-data-grid-controller/manual-save-data-grid-controller';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoutesProps {}

const Routes: React.FC<IRoutesProps> = (props) => {
    return (
        <RouterRoutes>
            <Route path={'*'} element={<Navigate to={routeUrls.dataGridAutoSave} />} />
            <Route path={'*'} element={<LayoutRoute layoutComponent={GtechIndustriesLayout} />}>
                <Route path={routeUrls.dataGridAutoSave} element={<AutoSaveDataGridController />} />
                <Route path={routeUrls.dataGridManualSave} element={<ManualSaveDataGridController />} />
                <Route path={routeUrls.treeView} element={<div>TreeView</div>} />
            </Route>
        </RouterRoutes>
    );
};

export { Routes };
