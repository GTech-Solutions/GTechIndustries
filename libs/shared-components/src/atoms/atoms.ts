import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';
import { GridDensity } from '@mui/x-data-grid-pro';

export const themeColorMode = atom<PaletteMode>('light');
export const dataGridDensity = atom<GridDensity>((localStorage.getItem('data-grid-density') as GridDensity) || 'compact');
