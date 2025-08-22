import { StyleSheet } from 'react-native';

// Import prop types
import { ScrollViewProps } from 'react-native';
import { SectionInterface } from 'react-native-tableview-simple/lib/typescript/components/Section';
import { CellInterface } from 'react-native-tableview-simple/lib/typescript/components/Cell';
import { CalendarProps, CheckboxProps, CircularProgressProps, ColorPickerProps, HeaderProps, TextButtonProps } from '@/types/props';

import { calcContrastingAccentPair } from '@/Styles/Colors';

import { ColorTheme } from '@/types/types';

// Consistent styles across common elements
export function containerStyles(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    return StyleSheet.create({
        container: {
            backgroundColor: background,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    });
}
export function textStyles(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    return StyleSheet.create({
        text: {
            color: primary,
        },
        menuText: {
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 35,
            color: primary,
        },
    });
}

// Consistent props for react native components
export function scrollViewProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const scrollViewProps: ScrollViewProps = {
        indicatorStyle: isDark ? 'white' : 'black',
        style: {
            width: '100%',
        }
    };

    return scrollViewProps;
}
export function tableSectionProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const tableSectionProps: SectionInterface = {
        headerTextColor: secondary,
        footerTextColor: secondary,
        separatorTintColor: borders,
    };

    return tableSectionProps;
}
export function tableCellProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const tableCellProps: CellInterface = {
        titleTextColor: primary,
        subtitleColor: secondary,
        backgroundColor: foreground,
        highlightUnderlayColor: primary,
        highlightActiveOpacity: 0.8,
        accessoryColor: accent,
        accessoryColorDisclosureIndicator: secondary,
    };

    return tableCellProps;
}

// Consistent props for custom components
export function calendarProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const calendarProps: CalendarProps = {
        calendarStyle: {
            calendarBackground: background,        // background color
            textSectionTitleColor: secondary,      // day name color (mon tue wed)
            dayTextColor: primary,                 // day number text color
            todayTextColor: accent,                // today number text color
            monthTextColor: primary,               // month text color
            arrowColor: accent,                    // arrow color
            disabledArrowColor: secondary,         // disabled arrow color
            selectedDayBackgroundColor: accent,    // selected day background color
            selectedDayTextColor: background,      // selected day text color
        }
    };

    return calendarProps;
}
export function checkboxProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const checkboxProps: CheckboxProps = {
        color: accent,
        size: '75%',
    };

    return checkboxProps;
}
export function circularProgressProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    // Calculate the background and progress bar colors using an appropriate contrast from the accent
    const { lighter, darker } = calcContrastingAccentPair(accent);

    const circularProgressProps: CircularProgressProps = {
        backgroundColor: darker,
        progressColor: lighter,
    };

    return circularProgressProps;
}
export function colorPickerProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const colorPickerProps: ColorPickerProps = {
        style: {
            backgroundColor: background,
        },
        buttonStyle: {
            borderColor: borders,
        },
    };

    return colorPickerProps;
}
export function headerProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const headerProps: HeaderProps = {
        titleStyle: {
            color: primary,
        },
        style: {
            backgroundColor: background,
            borderBottomWidth: 1,
            borderBottomColor: borders,
        },
        imageColor: primary,
    };

    return headerProps;
}
export function textButtonProps(colors: ColorTheme) {
    const { isDark, background, primary, secondary, foreground, borders, accent } = colors;

    const textButtonProps: TextButtonProps = {
        style: {
            backgroundColor: foreground,
            borderColor: borders,
        },
        textStyle: {
            color: primary,
        }
    };

    return textButtonProps;
}