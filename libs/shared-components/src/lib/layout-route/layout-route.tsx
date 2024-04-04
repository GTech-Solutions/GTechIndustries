import React from 'react';
import { Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILayoutRouteProps {
  layoutComponent: React.ElementType;
}

const LayoutRoute: React.FC<ILayoutRouteProps> = (props) => {
  const LayoutComponent = props.layoutComponent;

  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
};

export { LayoutRoute };
