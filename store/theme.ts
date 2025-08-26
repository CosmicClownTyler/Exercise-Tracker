import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Accents } from '@/Styles/Colors'

import type { AppState } from "@/store";
import type { ThemeState, ColorHex } from '@/types/types';

// The initial default theme state
export const defaultThemeState: ThemeState = {
    colorScheme: 'system',
    accentType: 'default',
    customAccentColor: Accents.Red,
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
        automaticColorScheme: (state) => {
            state.colorScheme = 'system';
        },
        darkColorScheme: (state) => {
            state.colorScheme = 'dark';
        },
        lightColorScheme: (state) => {
            state.colorScheme = 'light';
        },
        automaticAccentColor: (state) => {
            state.accentType = 'default';
        },
        customAccentColor: (state) => {
            state.accentType = 'custom';
        },
        setThemeAccentColor: (state, action: PayloadAction<ColorHex>) => {
            state.customAccentColor = action.payload;
        },
    },
});

// The reducer for this slice
export const themeReducer = themeSlice.reducer;

// The actions for this slice
export const {
    revertToDefaultTheme,
    automaticColorScheme,
    darkColorScheme,
    lightColorScheme,
    automaticAccentColor,
    customAccentColor,
    setThemeAccentColor,
} = themeSlice.actions;

// Basic selectors
export const selectTheme = (state: AppState) => state.settings.theme;
export const selectThemeColorScheme = (state: AppState) => state.settings.theme.colorScheme;
export const selectThemeAccentType = (state: AppState) => state.settings.theme.accentType;
export const selectThemeCustomAccentColor = (state: AppState) => state.settings.theme.customAccentColor;