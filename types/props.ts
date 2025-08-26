import type { DimensionValue, StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Theme as CalendarTheme, MarkedDates as CalendarMarkedDates, MarkingTypes as CalendarMarkingTypes, DateData } from 'react-native-calendars/src/types';

import type { HomeStackParamList, HistoryStackParamList, SettingsStackParamList, ColorHex } from '@/types/types';

// Home stack route props
export type HomeLandingProps = NativeStackScreenProps<HomeStackParamList, 'Landing'>;
export type SitUpsProps = NativeStackScreenProps<HomeStackParamList, 'SitUps'>;
export type PushUpsProps = NativeStackScreenProps<HomeStackParamList, 'PushUps'>;
export type PullUpsProps = NativeStackScreenProps<HomeStackParamList, 'PullUps'>;
export type PlanksProps = NativeStackScreenProps<HomeStackParamList, 'Planks'>;
// History stack route props
export type HistoryLandingProps = NativeStackScreenProps<HistoryStackParamList, 'Landing'>;
export type EntryProps = NativeStackScreenProps<HistoryStackParamList, 'Entry'>;
// Settings stack route props
export type SettingsLandingProps = NativeStackScreenProps<SettingsStackParamList, 'Landing'>;
export type DateTimeProps = NativeStackScreenProps<SettingsStackParamList, 'DateTime'>;
export type NotificationsProps = NativeStackScreenProps<SettingsStackParamList, 'Notifications'>;
export type ThemeProps = NativeStackScreenProps<SettingsStackParamList, 'Theme'>;


// Component props
export interface CalendarProps {
    calendarStyle?: CalendarTheme;
    selectedDay?: DateData;
    onDaySelect: (date: DateData) => void;
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
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    children?: string;
};


// Exercise component props
export interface PlanksComponentProps {

};
export interface PullUpsComponentProps {

};
export interface PushUpsComponentProps {

};
export interface SitUpsComponentProps {

};