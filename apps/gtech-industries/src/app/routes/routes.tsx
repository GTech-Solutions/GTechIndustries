import React from 'react';
import { LayoutRoute } from '@org/shared-components';
import { GtechIndustriesLayout } from '../gtech-industries-layout/gtech-industries-layout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoutesProps {}

const Routes: React.FC<IRoutesProps> = (props) => {
  return <LayoutRoute layoutComponent={GtechIndustriesLayout}></LayoutRoute>;
};

export { Routes };
