import type { NavigatorScreenParams } from '@react-navigation/native';

// Navigation types
export type RootBottomTabParamList = {
    History: NavigatorScreenParams<HistoryStackParamList>;
    FITinerary: NavigatorScreenParams<FITineraryStackParamList>;
    Exercises: NavigatorScreenParams<ExercisesStackParamList>;
    Settings: NavigatorScreenParams<SettingsStackParamList>;
};
export type HistoryStackParamList = {
    Landing: undefined;
    Entry: { id: number };
};
export type FITineraryStackParamList = {
    Landing: undefined;
};
export type ExercisesStackParamList = {
    Landing: undefined;
    Situps: undefined;
    Pushups: undefined;
    Pullups: undefined;
    Planks: undefined;
    Squats: undefined;
    HistoryEntry: undefined;
};
export type SettingsStackParamList = {
    Landing: undefined;
    DateTime: undefined;
    Notifications: undefined;
    Behaviour: undefined;
    Layout: undefined;
    Theme: undefined;
};


// State types
export interface HistoryState {
    byId: Record<number, HistoryEntry>;
    allIds: number[];
    nextId: number;
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
    exercisesListView: boolean;
    historyEntryFloatingButton: boolean;
    confirmBeforeDeletingEntry: boolean;
};


// History entry type
export interface HistoryEntry {
    id: number;
    date: string; // string in YYYY-MM-DD format
    exercise: string;
    count: number;
};
// New history entry type (omits the ID value as it is set automatically)
export type NewHistoryEntry = Omit<HistoryEntry, "id">;


// Theme and color types
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