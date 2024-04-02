import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';
import { GridDensity } from '@mui/x-data-grid-pro';
import { atomWithStorage } from 'jotai/vanilla/utils';

export const themeColorMode = atomWithStorage<PaletteMode>('g-tech-darkMode', 'light');
