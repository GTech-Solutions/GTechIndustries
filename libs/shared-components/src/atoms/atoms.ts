import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';

export const themeColorMode = atom<PaletteMode>('light');
