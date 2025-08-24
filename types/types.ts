import type { NavigatorScreenParams } from '@react-navigation/native';

// Navigation types
export type HomeStackParamList = {
    Home2: undefined;
    SitUps: undefined;
    PushUps: undefined;
    PullUps: undefined;
    Planks: undefined;
};
export type SettingsStackParamList = {
    Settings2: undefined;
    DateTime: undefined;
    Notifications: undefined;
    Theme: undefined;
};
export type RootBottomTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>;
    Settings: NavigatorScreenParams<SettingsStackParamList>;
    History: undefined;
};


// State types
export interface HistoryState {
    dates: Date[];
};
export interface SettingsState {
    theme: ThemeState;
    preferences: PreferencesState;
};
export interface ThemeState {
    colorScheme: 'dark' | 'light' | 'system';
    accentType: 'default' | 'custom';
    customAccentColor: ColorHex;
};
export interface PreferencesState {
    weekStartsOn: Weekday;
    taskViewIsPopup: boolean;
};


// Theme, style and color types
export interface ColorTheme {
    isDark: boolean;            // The boolean value determining if this color theme is dark or light themed
    background: ColorHex;       // The color used for the background and empty spaces                  Determined by theme color scheme
    primary: ColorHex;          // The color used for the main text and other key elements             Determined by theme color scheme
    secondary: ColorHex;        // The color used for smaller text and other side elements             Determined by theme color scheme
    foreground: ColorHex;       // The color used for filling sub elements                             Determined by theme color scheme
    borders: ColorHex;          // The color used for borders and outlines                             Determined by theme color scheme
    accent: ColorHex;           // The color used for accents and specific visual focal points         Determined by theme accent type
};
export type ColorRGB = {
    r: number;
    g: number;
    b: number;
};
export type ColorHex = `#${string}`;


// Weekday enum
export enum Weekday {
    Sunday = 'Sunday',
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
};