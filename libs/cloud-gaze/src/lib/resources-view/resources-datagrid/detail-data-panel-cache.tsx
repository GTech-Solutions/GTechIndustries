import React from 'react';
import { GridRowId } from '@mui/x-data-grid-pro';

export const DetailPanelDataCache = React.createContext<Map<GridRowId, any>>(new Map());
