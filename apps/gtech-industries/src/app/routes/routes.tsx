import React from 'react';
import { GtechIndustriesLayout } from '../gtech-industries-layout/gtech-industries-layout';
import { LayoutRoute } from '@gtech/shared-components';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoutesProps {}

const Routes: React.FC<IRoutesProps> = (props) => {
    return (
        <RouterRoutes>
            {/*
            <Route path='/*' element={<Navigate to={'taco'} replace />} />
*/}
            <Route path={'/'} element={<LayoutRoute layoutComponent={GtechIndustriesLayout} />}>
                <Route path={'taco'} element={<h1>hai</h1>} />
            </Route>
        </RouterRoutes>
    );
};

export { Routes };
