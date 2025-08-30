import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import { selectPreferencesWeekStartsOn } from '@/store/preferences';
import { addEntry } from '@/store/history';

import * as Styles from '@/Styles/Styles';
import Calendar from '@/Components/Calendar';
import TextButton from '@/Components/TextButton';

import { dateToDateData } from '@/lib/utils';

import type { DateData } from 'react-native-calendars';
import type { NewHistoryEntry } from '@/types/types';
import type { ManualComponentProps } from '@/types/props';

export default function ManualComponent(props: ManualComponentProps) {
    // Values to 
    const [date, setDate] = useState<DateData>(dateToDateData(new Date()));
    const [dateString, setDateString] = useState<string>(date.dateString);
    const [exercise, setExercise] = useState<string>("");
    const [countString, setCountString] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    // Get necessary state
    const dispatch = useAppDispatch();
    const weekStartsOn = useAppSelector(state => selectPreferencesWeekStartsOn(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const textStyles = Styles.textStyles(themeColors);
    const textButtonProps = Styles.textButtonProps(themeColors);
    const calendarProps = Styles.calendarProps(themeColors, weekStartsOn);

    const onExerciseTextChange = (text: string) => {
        setExercise(text);
    };
    const onCountTextChange = (text: string) => {
        if (/^\d*$/.test(text)) {
            setCountString(text);
            setCount(parseInt(text));
        }
    };
    const onDateSelect = (date: DateData) => {
        setDate(date);
        setDateString(date.dateString);
    };

    const submitEntry = () => {
        const entry: NewHistoryEntry = {
            date: date.dateString,
            exercise: exercise,
            count: count,
        };

        dispatch(addEntry(entry));
    }

    return (
        <View style={{
            width: '100%',
            flexGrow: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
        }}>
            {/* Exercise name */}
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
            }}>
                <Text style={[textStyles.mediumText, { width: '50%' }]}>
                    Exercise Name
                </Text>
                <TextInput
                    textAlign='right'
                    value={exercise}
                    onChangeText={onExerciseTextChange}
                    style={[textStyles.text, { width: '50%' }]}
                    placeholder='Exercise name...'
                    placeholderTextColor={themeColors.secondary}
                />
            </View>
            {/* Exercise count */}
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
            }}>
                <Text style={[textStyles.mediumText, { width: '50%' }]}>
                    Count
                </Text>
                <TextInput
                    textAlign='right'
                    value={countString}
                    keyboardType='numeric'
                    onChangeText={onCountTextChange}
                    style={[textStyles.text, { width: '50%' }]}
                    placeholder='0'
                    placeholderTextColor={themeColors.secondary}
                />
            </View>
            {/* Date string */}
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
            }}>
                <Text style={[textStyles.mediumText, { width: '50%' }]}>
                    Date
                </Text>
                <Text style={[textStyles.text, { width: '50%', textAlign: 'right' }]}>
                    {dateString}
                </Text>
            </View>
            <Calendar
                {...calendarProps}
                selectedDay={date}
                onDaySelect={onDateSelect}
                // Extra information from the theme to ensure the component rerenders correctly
                themeKey={[themeColors.isDark, themeColors.accent, weekStartsOn]}
            />
            <View style={{
                width: '100%',
                alignItems: 'center',
            }}>
                <TextButton {...textButtonProps} onPress={submitEntry}>
                    Add
                </TextButton>
            </View>
        </View>
    );
};