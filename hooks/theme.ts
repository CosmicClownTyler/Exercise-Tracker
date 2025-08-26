import { useColorScheme } from 'react-native';

import { useAppSelector } from '@/hooks/hooks';
import { selectThemeColorScheme, selectThemeAccentType, selectThemeCustomAccentColor } from '@/store/theme';

import { DarkColorTheme, LightColorTheme } from '@/Styles/Colors'

import type { ColorTheme } from '@/types/types';

// Hook for getting the theme's color scheme ('light' or 'dark')
export const useThemeColorScheme = () => {
    // Get the color scheme from the theme state
    const colorScheme = useAppSelector(state => selectThemeColorScheme(state));

    // Get the system color scheme from react native's hook
    const systemColorScheme = useColorScheme();

    // If the theme's color scheme is set to system, return the system color scheme
    if (colorScheme == 'system') {
        if (systemColorScheme == 'light') {
            return 'light';
        }
        else {
            return 'dark';
        }
    }
    // Otherwise return the theme's color scheme, either 'dark' or 'light'
    else {
        return colorScheme;
    }
}
// Hook for getting the theme's colors
export const useThemeColors = () => {
    // Get the accent type and custom accent color from the theme state
    const accentType = useAppSelector(state => selectThemeAccentType(state));
    const customAccentColor = useAppSelector(state => selectThemeCustomAccentColor(state));

    // Get the theme's color scheme
    const colorScheme = useThemeColorScheme();

    // Set the colors based on the color scheme
    let colors = colorScheme == 'dark' ? { ...DarkColorTheme } : { ...LightColorTheme };

    // Set the accent color if the accent type is custom
    if (accentType == "custom") {
        colors.accent = customAccentColor;
    }

    return colors as ColorTheme;
}