import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DarkColorTheme, LightColorTheme, Accents } from '@/Styles/Colors'

import { ColorHex, ThemeState } from '@/types/types';

// The initial default theme state
export const defaultThemeState: ThemeState = {
    systemColorScheme: undefined,
    colorScheme: 'system',
    accentType: 'default',
    customAccentColor: Accents.Red,
    colors: DarkColorTheme,
    isDark: true,
};

// The theme slice
export const themeSlice = createSlice({
    name: 'theme',
    initialState: defaultThemeState,
    reducers: {
        revertToDefaultTheme: (state) => {
            console.warn('RESETTING THEME');
            state = defaultThemeState;
        },
        darkSystemColorScheme: (state) => {
            state.systemColorScheme = 'dark';
            state = updateStateTheme(state);
        },
        lightSystemColorScheme: (state) => {
            state.systemColorScheme = 'light';
            state = updateStateTheme(state);
        },
        undefinedSystemColorScheme: (state) => {
            state.systemColorScheme = undefined;
            state = updateStateTheme(state);
        },
        automaticColorScheme: (state) => {
            state.colorScheme = 'system';
            state = updateStateTheme(state);
        },
        darkColorScheme: (state) => {
            state.colorScheme = 'dark';
            state = updateStateTheme(state);
        },
        lightColorScheme: (state) => {
            state.colorScheme = 'light';
            state = updateStateTheme(state);
        },
        automaticAccentColor: (state) => {
            state.accentType = 'default';
            state = updateStateTheme(state);
        },
        customAccentColor: (state) => {
            state.accentType = 'custom';
            state = updateStateTheme(state);
        },
        setThemeAccentColor: (state, action: PayloadAction<ColorHex>) => {
            state.customAccentColor = action.payload;
            state = updateStateTheme(state);
        },
    },
});

// The reducer for this slice
export const themeReducer = themeSlice.reducer;

// The actions for this slice
export const {
    revertToDefaultTheme,
    darkSystemColorScheme,
    lightSystemColorScheme,
    undefinedSystemColorScheme,
    automaticColorScheme,
    darkColorScheme,
    lightColorScheme,
    automaticAccentColor,
    customAccentColor,
    setThemeAccentColor,
} = themeSlice.actions;


// Use these functions to set color and accent values in the reducers above to ensure consistency
function updateStateTheme(theme: ThemeState) {
    theme = updateThemeColors(theme);
    theme = updateThemeAccentColor(theme);

    return theme;
}
function updateThemeColors(theme: ThemeState) {
    // If the color scheme is system, set the colors based on the system color scheme
    if (theme.colorScheme == 'system') {
        // Dark
        if (theme.systemColorScheme == 'dark') {
            theme = updateThemeDarkColors(theme);
        }
        // Light
        else if (theme.systemColorScheme == 'light') {
            theme = updateThemeLightColors(theme);
        }
        // Undefined (use dark as default)
        else {
            theme = updateThemeDarkColors(theme);
        }
    }
    // If the color scheme is manually set to dark
    else if (theme.colorScheme == 'dark') {
        theme = updateThemeDarkColors(theme);
    }
    // If the color scheme is manually set to light
    else if (theme.colorScheme == 'light') {
        theme = updateThemeLightColors(theme);
    }

    return theme;
}
function updateThemeDarkColors(theme: ThemeState) {
    theme.colors = { ...DarkColorTheme, accent: theme.colors.accent };
    theme.isDark = true;

    return theme;
}
function updateThemeLightColors(theme: ThemeState) {
    theme.colors = { ...LightColorTheme, accent: theme.colors.accent };
    theme.isDark = false;

    return theme;
}
function updateThemeAccentColor(theme: ThemeState) {
    // If the accent type is default, set the accent color based on the current color scheme
    if (theme.accentType == 'default') {
        // Dark
        if (theme.isDark) {
            theme = updateThemeDarkAccentColor(theme);
        }
        // Light
        else {
            theme = updateThemeLightAccentColor(theme);
        }
    }
    // If the accent type is custom, set the accent color based on the custom set accent
    else {
        theme = updateThemeCustomAccentColor(theme);
    }

    return theme;
}
function updateThemeDarkAccentColor(theme: ThemeState) {
    theme.colors = { ...theme.colors, accent: DarkColorTheme.accent };

    return theme;
}
function updateThemeLightAccentColor(theme: ThemeState) {
    theme.colors = { ...theme.colors, accent: LightColorTheme.accent };

    return theme;
}
function updateThemeCustomAccentColor(theme: ThemeState) {
    theme.colors = { ...theme.colors, accent: theme.customAccentColor };

    return theme;
}