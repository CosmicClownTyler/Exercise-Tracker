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
    // Deconstruct props
    const { onSubmit } = props;

    // State values to create the new entry
    const [date, setDate] = useState<DateData>(dateToDateData(new Date()));
    const [dateString, setDateString] = useState<string>(date.dateString);
    const [exercise, setExercise] = useState<string>("");
    const [countString, setCountString] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    // Error message (if any exists)
    const [error, setError] = useState<string>("");
    const ERROR_EMPTY_EXERCISE_NAME = "The exercise name cannot be blank";
    const ERROR_COUNT_IS_NAN = "The count must be a valid number";
    const ERROR_COUNT_NUMBER_IS_LESS_THAN_ZERO = "The count number must be greater than 0";

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
        // Remove the error message if it was caused by this field
        if (error === ERROR_EMPTY_EXERCISE_NAME) setError("");

        // Set the exercise text
        setExercise(text);
    };
    const onCountTextChange = (text: string) => {
        // Remove the error message if it was caused by this field
        if (error === ERROR_COUNT_IS_NAN) setError("");

        // Set the count string
        setCountString(text);

        // If the input text is empty, do nothing
        if (text == "") {
            setCount(0);
        }
        // If the input text contains only digits, try parsing the count number
        else if (/^\d*$/.test(text)) {
            // Try parsing the count number
            const countInt = parseInt(text);

            // If parsing failed, set the error message
            if (isNaN(countInt)) {
                setError(ERROR_COUNT_IS_NAN);
                return;
            }

            // If parsing succeeded, set the count number
            setCount(parseInt(text));
        }
        // Otherwise set an error message
        else {
            setError(ERROR_COUNT_IS_NAN);
        }
    };
    const onDateSelect = (date: DateData) => {
        setDate(date);
        setDateString(date.dateString);
    };

    const submitEntry = () => {
        // If there is currently an error, do nothing
        if (error) {
            return;
        }

        // If there is no exercise text, set the error message and return
        if (exercise == "") {
            setError(ERROR_EMPTY_EXERCISE_NAME);
            return;
        }

        // If there is no exercise text, set the error message and return
        if (countString == "") {
            setError(ERROR_COUNT_IS_NAN);
            return;
        }

        // If the count is less than 1, set the error message and return
        if (count < 1) {
            setError(ERROR_COUNT_NUMBER_IS_LESS_THAN_ZERO);
            return;
        }

        // Create the new entry if the values are valid
        const entry: NewHistoryEntry = {
            date: date.dateString,
            exercise: exercise,
            count: count,
        };

        // Add the entry to the state
        dispatch(addEntry(entry));

        // If an on submit function exists, call it after submitting
        if (onSubmit) onSubmit();
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
                    keyboardType='number-pad'
                    returnKeyType='done'
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
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}>
                <Text style={[textStyles.mediumText, { color: 'red' }]}>
                    {error}
                </Text>
                <TextButton {...textButtonProps} onPress={submitEntry}>
                    Add
                </TextButton>
            </View>
        </View>
    );
};