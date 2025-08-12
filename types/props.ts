import { DimensionValue, StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native';

import { Theme as CalendarTheme, MarkedDates as CalendarMarkedDates, MarkingTypes as CalendarMarkingTypes } from 'react-native-calendars/src/types';

import { ColorHex } from '@/types/types';

// Component props
export interface CalendarProps {
    calendarStyle?: CalendarTheme,
    markedDates?: CalendarMarkedDates,
    themeKey?: any,
    monthFormat?: string,
    hideExtraDays?: boolean,
    firstDay?: number,
    enableSwipeMonths?: boolean,
    markingType?: CalendarMarkingTypes,
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
    title?: string,
    titleStyle?: StyleProp<TextStyle>,
    imageColor?: ColorHex,
    style?: StyleProp<ViewStyle>,
    leftText?: string,
    leftImage?: ImageSourcePropType,
    onLeft?: () => void,
    rightText?: string,
    rightImage?: ImageSourcePropType,
    onRight?: () => void,
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