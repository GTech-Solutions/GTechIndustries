import { CustomThemeType } from './custom-theme-type';
import createPalette from '@mui/material/styles/createPalette';

interface UseLightPalette {
    theme: CustomThemeType;
}

// ToDo seperate out these variants further

const paletteHelpers = createPalette({});

const useThemeVariant = (mode: string, primary_color?: string, secondary_color?: string): UseLightPalette => {
    const lightPalette = createPalette({
        mode: 'light',

        primary: paletteHelpers.augmentColor({
            color: {
                main: '#1976d2',
            },
            name: 'primary',
        }),
        secondary: paletteHelpers.augmentColor({
            color: {
                main: '#9c27b0',
            },
            name: 'secondary',
        }),
        error: paletteHelpers.augmentColor({
            color: { main: '#d32f2f' },
            name: 'error',
        }),
        warning: paletteHelpers.augmentColor({
            color: { main: '#ed6c02' },
            name: 'warning',
        }),
        info: paletteHelpers.augmentColor({
            color: { main: '#0288d1' },
            name: 'info',
        }),
        success: paletteHelpers.augmentColor({
            color: { main: '#2e7d32' },
            name: 'success',
        }),
        grey: {
            50: '#F1F3F9',
            100: '#DEDEE3',
            200: '#BCBCC7',
            300: '#8E8EA0',
            400: '#69697F',
            500: '#5A5A72',
            600: '#494A64',
            700: '#373854',
            800: '#232443',
            900: '#131333',
        },
        text: {
            primary: '#131333',
            secondary: '#55566C',
            disabled: 'rgba(26, 27, 96, 0.28)',
        },
        background: {
            default: '#fff',
            paper: '#FBFCFE',
            ...(mode === 'dark' && { default: '#090E10', paper: '#131B20' }),
        },
        action: {
            active: 'rgba(26, 27, 96, 0.54)',
            hover: 'rgba(19, 19, 51, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(90, 90, 114, 0.08)',
            selectedOpacity: 0.08,
            disabled: 'rgba(19, 19, 51, 0.26)',
            disabledBackground: 'rgba(19, 19, 51, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(19, 19, 51, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },
    });

    const lightTheme = {
        mode: mode,
        palette: lightPalette,
        shadows: [
            'none',
            '0px 3px 5px -1px rgba(19,19,51,0.2),0px 6px 10px 0px rgba(19,19,51,0.14),0px 1px 18px 0px rgba(19,19,51,0.12)',
            '0px 8px 9px -5px rgba(19,19,51,0.2),0px 15px 22px 2px rgba(19,19,51,0.14),0px 6px 28px 5px rgba(19,19,51,0.12)',
            '0px 11px 15px -7px rgba(19,19,51,0.2),0px 24px 38px 3px rgba(19,19,51,0.14),0px 9px 46px 8px rgba(19,19,51,0.12)',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
        ],
    } as CustomThemeType;

    const darkPalette = createPalette({
        mode: 'dark',
        common: {
            black: '#131333',
            white: '#F8F8FF',
        },
        primary: paletteHelpers.augmentColor({
            color: { main: primary_color ? primary_color : '#0A66C2' },
            name: 'primary',
        }),
        secondary: paletteHelpers.augmentColor({
            color: { main: secondary_color ? secondary_color : '#6709AA' },
            name: 'secondary',
        }),
        error: paletteHelpers.augmentColor({
            color: { main: '#D32F2F' },
            name: 'error',
        }),
        warning: paletteHelpers.augmentColor({
            color: { main: '#F79F00' },
            name: 'warning',
        }),
        info: paletteHelpers.augmentColor({
            color: { main: '#00C2FF' },
            name: 'info',
        }),
        success: paletteHelpers.augmentColor({
            color: { main: '#1F7A1F' },
            name: 'success',
        }),
        grey: {
            50: '#EEEEFA',
            100: '#DDDDF5',
            200: '#CECFEC',
            300: '#BABADE',
            400: '#A1A1CE',
            500: '#7C7DB8',
            600: '#6162A8',
            700: '#494A90',
            800: '#3B3C7D',
            900: '#131333',
        },
        text: {
            primary: '#F8F8FF',
            secondary: '#A7A4E1',
            disabled: '#7472A4',
        },
        background: {
            default: '#fff',
            paper: '#FBFCFE',
            ...(mode === 'dark' && { default: '#090E10', paper: '#131B20' }),
        },
        action: {
            active: 'rgba(248, 248, 255, 0.56)',
            hover: 'rgba(41, 121, 241, 0.08)',
            hoverOpacity: 0.08,
            selected: 'rgba(41, 121, 241, 0.16)',
            selectedOpacity: 0.16,
            disabled: 'rgba(124, 125, 184, 0.3)',
            disabledBackground: 'rgba(124, 125, 184, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(124, 125, 184, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },
    });

    const darkTheme = {
        mode: mode,
        palette: darkPalette,
        shadows: [
            'none',
            '0px 3px 5px -1px rgba(19,19,51,0.2),0px 6px 10px 0px rgba(19,19,51,0.14),0px 1px 18px 0px rgba(19,19,51,0.12)',
            '0px 8px 9px -5px rgba(19,19,51,0.2),0px 15px 22px 2px rgba(19,19,51,0.14),0px 6px 28px 5px rgba(19,19,51,0.12)',
            '0px 11px 15px -7px rgba(19,19,51,0.2),0px 24px 38px 3px rgba(19,19,51,0.14),0px 9px 46px 8px rgba(19,19,51,0.12)',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
        ],
    } as CustomThemeType;

    const theme = mode === 'dark' ? darkTheme : lightTheme;

    return { theme };
};

export { useThemeVariant, UseLightPalette };
