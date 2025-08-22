import { useColorScheme } from 'react-native';

import { useStore, useSelector, useDispatch } from 'react-redux';
import type { AppStore, AppState, AppDispatch } from '@/store/';

import { DarkColorTheme, LightColorTheme } from '@/Styles/Colors'
import { ColorTheme } from '@/types/types';

// Typed store, selector, and dispatch
export const useAppStore = useStore.withTypes<AppStore>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Hook for getting the theme's color scheme ('light' or 'dark')
export const useThemeColorScheme = () => {
    // Get the theme from the state
    const theme = useAppSelector(state => state.settings.theme);

    // Get the system color scheme from react native's hook
    const systemColorScheme = useColorScheme();

    // If the theme's color scheme is set to system, return the system color scheme
    if (theme.colorScheme == 'system') {
        if (systemColorScheme == 'light') {
            return 'light';
        }
        else {
            return 'dark';
        }
    }
    // Otherwise return the theme's color scheme, either 'dark' or 'light'
    else {
        return theme.colorScheme;
    }
}
// Hook for getting the theme's accent type ('default' or 'custom')
export const useThemeAccentType = () => {
    // Get the theme from the state
    const theme = useAppSelector(state => state.settings.theme);

    return theme.accentType;
}
// Hook for getting the theme's colors
export const useThemeColors = () => {
    // Get the theme from the state
    const theme = useAppSelector(state => state.settings.theme);

    // Get the theme's color scheme
    const colorScheme = useThemeColorScheme();

    // Set the colors based on the color scheme
    let colors = colorScheme == 'dark' ? { ...DarkColorTheme } : { ...LightColorTheme };

    // Set the accent color if the accent type is custom
    if (theme.accentType == "custom") {
        colors.accent = theme.customAccentColor;
    }

    return colors as ColorTheme;
}