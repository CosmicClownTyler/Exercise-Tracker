import type { DimensionValue, StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Theme as CalendarTheme, MarkedDates as CalendarMarkedDates, MarkingTypes as CalendarMarkingTypes, DateData } from 'react-native-calendars/src/types';

import type { HistoryStackParamList, FITineraryStackParamList, ExercisesStackParamList, SettingsStackParamList, ColorHex } from '@/types/types';

// History stack route props
export type HistoryLandingProps = NativeStackScreenProps<HistoryStackParamList, 'Landing'>;
export type EntryProps = NativeStackScreenProps<HistoryStackParamList, 'Entry'>;
// FITinerary stack route props
export type FITineraryLandingProps = NativeStackScreenProps<FITineraryStackParamList, 'Landing'>;
// Exercises stack route props
export type ExercisesLandingProps = NativeStackScreenProps<ExercisesStackParamList, 'Landing'>;
export type SitupsProps = NativeStackScreenProps<ExercisesStackParamList, 'Situps'>;
export type PushupsProps = NativeStackScreenProps<ExercisesStackParamList, 'Pushups'>;
export type PullupsProps = NativeStackScreenProps<ExercisesStackParamList, 'Pullups'>;
export type PlanksProps = NativeStackScreenProps<ExercisesStackParamList, 'Planks'>;
export type SquatsProps = NativeStackScreenProps<ExercisesStackParamList, 'Squats'>;
export type HistoryEntryProps = NativeStackScreenProps<ExercisesStackParamList, 'HistoryEntry'>;
// Settings stack route props
export type SettingsLandingProps = NativeStackScreenProps<SettingsStackParamList, 'Landing'>;
export type DateTimeProps = NativeStackScreenProps<SettingsStackParamList, 'DateTime'>;
export type NotificationsProps = NativeStackScreenProps<SettingsStackParamList, 'Notifications'>;
export type BehaviourProps = NativeStackScreenProps<SettingsStackParamList, 'Behaviour'>;
export type LayoutProps = NativeStackScreenProps<SettingsStackParamList, 'Layout'>;
export type ThemeProps = NativeStackScreenProps<SettingsStackParamList, 'Theme'>;

// Component props
export interface CalendarProps {
    calendarStyle?: CalendarTheme;
    selectedDay?: DateData | null;
    onDaySelect?: (date: DateData) => void;
    onMonthSelect?: (date: DateData) => void;
    markedDates?: CalendarMarkedDates;
    themeKey?: any;
    monthFormat?: string;
    hideExtraDays?: boolean;
    firstDay?: number;
    enableSwipeMonths?: boolean;
    markingType?: CalendarMarkingTypes;
};
export interface CheckboxProps {
    checked?: boolean;
    onToggle?: () => void;
    size?: DimensionValue;
    borderWidth?: number;
    borderRadius?: number;
    gapWidth?: number;
    gapRadius?: number;
    color?: ColorHex;
    emptyColor?: ColorHex;
    margin?: number;
};
export interface CircularProgressProps {
    size?: number;
    backgroundWidth?: number;
    progressWidth?: number;
    backgroundColor?: ColorHex;
    progressColor?: ColorHex;
    progress?: number;
    maxProgress?: number;
    style?: StyleProp<ViewStyle>;
};
export interface ColorPickerProps {
    onChange?: (accent: ColorHex) => void;
    style?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
};
export interface HeaderProps {
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    imageColor?: ColorHex;
    style?: StyleProp<ViewStyle>;
    leftText?: string;
    leftImage?: ImageSourcePropType;
    onLeft?: () => void;
    rightText?: string;
    rightImage?: ImageSourcePropType;
    onRight?: () => void;
};
export interface TabBarIconProps {
    color: ColorHex;
    size: number;
};
export interface TextButtonProps {
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    children?: string;
};
export interface ImageButtonProps {
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    src?: ImageSourcePropType;
    color?: ColorHex;
    size?: number;
};
export interface HistoryEntryComponentProps {
    entryId?: number;
    onSubmit?: () => void;
};


// Exercise component props
export interface SitupsComponentProps {

};
export interface PushupsComponentProps {

};
export interface PullupsComponentProps {

};
export interface PlanksComponentProps {

};
export interface SquatsComponentProps {

};