import { useMemo } from 'react';
import { useThemeVariant } from './use-theme-variant';
import { alpha, createTheme, Theme } from '@mui/material';
import { CustomDataGrid, CustomDataGridToolbar } from '@gtech/shared-components';
import { GridLogicOperator, GridSlotsComponent } from '@mui/x-data-grid';
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
                            slotProps: {
                                pagination: {
                                    rowsPerPageOptions: [15, 25, 50, 100],
                                },
                                baseButton: { variant: 'text' },
                                filterPanel: {
                                    logicOperators: [GridLogicOperator.And],
                                    filterFormProps: {
                                        // Customize inputs by passing props
                                        logicOperatorInputProps: {
                                            variant: 'outlined',
                                            size: 'small',
                                        },
                                        columnInputProps: {
                                            variant: 'outlined',
                                            size: 'small',
                                            sx: { mt: 'auto' },
                                        },
                                        operatorInputProps: {
                                            variant: 'outlined',
                                            size: 'small',
                                            sx: { mt: 'auto' },
                                        },
                                        valueInputProps: {
                                            InputComponentProps: {
                                                variant: 'outlined',
                                                size: 'small',
                                                sx: { mt: 'auto' },
                                                notched: true.toString(),
                                            },
                                        },
                                        deleteIconProps: {
                                            sx: {
                                                '& .MuiSvgIcon-root': { color: '#d32f2f' },
                                            },
                                        },
                                    },
                                    sx: {
                                        // Customize inputs using css selectors
                                        '& .MuiDataGrid-filterForm': { p: 2 },
                                        '& .MuiDataGrid-filterForm:nth-child(even)': {
                                            backgroundColor: (theme: Theme) => (theme.palette.mode === 'dark' ? '#444' : '#f5f5f5'),
                                        },
                                        '& .MuiDataGrid-filterFormLogicOperatorInput': { mr: 2, width: 'auto' },
                                        '& .MuiDataGrid-filterFormColumnInput': { mr: 2, width: 'auto' },
                                        '& .MuiDataGrid-filterFormOperatorInput': { mr: 2, width: 'auto' },
                                        '& .MuiDataGrid-filterFormValueInput': { width: 'auto' },
                                    },
                                },
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
