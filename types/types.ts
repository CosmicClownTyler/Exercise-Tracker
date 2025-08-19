import type { NavigatorScreenParams } from '@react-navigation/native';

// Interfaces for store states
export interface StoreState {
    history: HistoryState,
    settings: SettingsState,
};
export interface HistoryState {
    dates: Date[]
};
export interface SettingsState {
    theme: ThemeState,
    preferences: PreferencesState,
};
export interface ThemeState {
    systemColorScheme: 'dark' | 'light' | undefined,
    colorScheme: 'dark' | 'light' | 'system',
    accentType: 'default' | 'custom',
    customAccentColor: ColorHex,
    colors: ColorTheme,
    isDark: boolean,
};
export interface PreferencesState {
    taskViewIsPopup: boolean,
};

// Interfaces for styles and colors
export interface ColorTheme {
    background: ColorHex,       // The color used for the background and empty spaces                  Determined by theme color scheme
    primary: ColorHex,          // The color used for the main text and other key elements             Determined by theme color scheme
    secondary: ColorHex,        // The color used for smaller text and other side elements             Determined by theme color scheme
    foreground: ColorHex,       // The color used for filling sub elements                             Determined by theme color scheme
    borders: ColorHex,          // The color used for borders and outlines                             Determined by theme color scheme
    accent: ColorHex,           // The color used for accents and specific visual focal points         Determined by theme accent type
};
export type ColorHex = `#${string}`;
export type ColorRGB = {
    r: number,
    g: number,
    b: number,
};






// Navigation types
// The homescreen parameter list
export type HomeStackParamList = {
    Home2: undefined;
    SitUps: undefined;
    PushUps: undefined;
    PullUps: undefined;
    Planks: undefined;
};
// The settings screen parameter list
export type SettingsStackParamList = {
    Settings2: undefined;
    DateTime: undefined;
    Notifications: undefined;
    Theme: undefined;
};
// The root bottom tab navigator parameter list
export type RootTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>;
    Settings: NavigatorScreenParams<SettingsStackParamList>;
    Calendar: undefined;
};