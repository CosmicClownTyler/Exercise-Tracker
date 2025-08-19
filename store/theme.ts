import { CaseReducer, PayloadAction, Slice, createSlice, Reducer } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

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

// The individual reducer functions
// Revert the theme back to the default
const _revertToDefaultTheme: CaseReducer<ThemeState> = (state) => {
    console.warn('RESETTING THEME');
    state = defaultThemeState;
};
// Set the system color scheme to dark
const _darkSystemColorScheme: CaseReducer<ThemeState> = (state) => {
    state.systemColorScheme = 'dark';
    state = updateStateTheme(state);
};
// Set the system color scheme to light
const _lightSystemColorScheme: CaseReducer<ThemeState> = (state) => {
    state.systemColorScheme = 'light';
    state = updateStateTheme(state);
};
// Set the system color scheme to undefined
const _undefinedSystemColorScheme: CaseReducer<ThemeState> = (state) => {
    state.systemColorScheme = undefined;
    state = updateStateTheme(state);
};
// Set the color scheme to system
const _automaticColorScheme: CaseReducer<ThemeState> = (state) => {
    state.colorScheme = 'system';
    state = updateStateTheme(state);
};
// Set the color scheme to dark
const _darkColorScheme: CaseReducer<ThemeState> = (state) => {
    state.colorScheme = 'dark';
    state = updateStateTheme(state);
};
// Set the color scheme to light
const _lightColorScheme: CaseReducer<ThemeState> = (state) => {
    state.colorScheme = 'light';
    state = updateStateTheme(state);
};
// Set the accent color to default
const _automaticAccentColor: CaseReducer<ThemeState> = (state) => {
    state.accentType = 'default';
    state = updateStateTheme(state);
};
// Set the accent color to custom
const _customAccentColor: CaseReducer<ThemeState> = (state) => {
    state.accentType = 'custom';
    state = updateStateTheme(state);
};
// Set the accent color based on the payload
const _setThemeAccentColor: CaseReducer<ThemeState, PayloadAction<ColorHex>> = (state, action) => {
    state.customAccentColor = action.payload;
    state = updateStateTheme(state);
};

// The theme slice
export const themeSlice: Slice = createSlice({
    name: 'theme',
    initialState: defaultThemeState,
    reducers: {
        revertToDefaultTheme: _revertToDefaultTheme,
        darkSystemColorScheme: _darkSystemColorScheme,
        lightSystemColorScheme: _lightSystemColorScheme,
        undefinedSystemColorScheme: _undefinedSystemColorScheme,
        automaticColorScheme: _automaticColorScheme,
        darkColorScheme: _darkColorScheme,
        lightColorScheme: _lightColorScheme,
        automaticAccentColor: _automaticAccentColor,
        customAccentColor: _customAccentColor,
        setThemeAccentColor: _setThemeAccentColor,
    },
});

// The config for storing this data
const themeConfig = {
    key: 'theme',
    storage: AsyncStorage,
    blacklist: ['systemColorScheme'], // blacklist the system color scheme as this should not be saved, but instead determined by the system's preferences
};

// The persisted reducer for this slice
export const themeReducer: Reducer = persistReducer(themeConfig, themeSlice.reducer);

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