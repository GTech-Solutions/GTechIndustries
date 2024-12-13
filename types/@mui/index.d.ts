import { GridColumnVisibilityModel } from '@mui/x-data-grid-pro';

declare module '@mui/x-data-grid-pro' {
    interface ToolbarPropsOverrides {
        dataGridIdentifier: string;
        withAutoSaveTableState?: boolean;
        withManualSaveTableState?: boolean;
        defaultHiddenColumns?: GridColumnVisibilityModel;
        dataGridDensity: dataGridDensity;
    }
}
