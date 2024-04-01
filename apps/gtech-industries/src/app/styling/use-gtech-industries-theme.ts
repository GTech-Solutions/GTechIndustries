import { useMemo } from 'react';
import { useThemeVariant } from './use-theme-variant';
import { alpha, createTheme, Theme } from '@mui/material';
import { CustomDataGrid, CustomDataGridToolbar } from '@gtech/shared-components';
import { GridSlotsComponent } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';

export interface UseGtechIndustriesTheme {
    theme: Theme;
}

export function useGtechIndustriesTheme(mode: string, primary_color?: string, secondary_color?: string): UseGtechIndustriesTheme {
    const themeVariant = useThemeVariant(mode, primary_color, secondary_color);
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    ...themeVariant.theme.palette,
                },
                components: {
                    MuiMenuItem: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                borderRadius: '99px',
                                color: theme.palette.grey['500'],
                                fontWeight: 500,
                                ...(theme.palette.mode === 'dark' && {
                                    color: theme.palette.grey['300'],
                                }),
                            }),
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                backgroundImage: 'none',
                                backgroundColor: theme.palette.grey['100'],
                                ...(theme.palette.mode === 'dark' && {
                                    backgroundColor: alpha(theme.palette.grey['900'], 0.6),
                                }),
                            }),
                        },
                    },
                    MuiDataGrid: {
                        defaultProps: {
                            pageSizeOptions: [15, 25, 50, 100],
                            density: 'compact',
                            paginationModel: {
                                pageSize: 15,
                                page: 0,
                            },
                            slots: {
                                toolbar: CustomDataGridToolbar as GridSlotsComponent['toolbar'],
                            },
                        },
                    },
                },
            }),
        [mode, primary_color, secondary_color]
    );

    return { theme };
}
export default useGtechIndustriesTheme;
