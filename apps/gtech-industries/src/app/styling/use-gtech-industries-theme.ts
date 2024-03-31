import { useMemo } from 'react';
import { useThemeVariant } from './use-theme-variant';
import { createTheme, Theme } from '@mui/material';

export interface UseGtechIndustriesTheme {
  theme: Theme;
}

export function useGtechIndustriesTheme(
  mode: string,
  primary_color?: string,
  secondary_color?: string
): UseGtechIndustriesTheme {
  const themeVariant = useThemeVariant(mode, primary_color, secondary_color);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...themeVariant.theme.palette,
        },
      }),
    [mode, primary_color, secondary_color]
  );

  return { theme };
}
export default useGtechIndustriesTheme;
