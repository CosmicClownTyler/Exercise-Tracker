import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector, useThemeColors } from '@/hooks';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import Calendar from '@/Components/Calendar';
import type { DateData } from 'react-native-calendars';

export default function HistoryScreen() {
    // Get necessary state
    const weekStartsOn = useAppSelector(state => state.settings.preferences.weekStartsOn);

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const calendarProps = Styles.calendarProps(themeColors, weekStartsOn);
    // Todays date
    const todayDate = new Date();
    const today: DateData = {
        year: todayDate.getFullYear(),
        month: todayDate.getMonth() + 1, // (get month starts at 0 for January, DateData starts at 1 for January)
        day: todayDate.getDate(),
        timestamp: todayDate.getTime(),
        dateString: todayDate.toISOString().split("T")[0],
    };

    // The currently selected day
    const [selectedDay, setSelectedDay] = useState<DateData | undefined>(today);

    // Function for selecting days
    const onDaySelect = (date: DateData) => {
        // If pressing the currently selected date, clear the selection
        if (selectedDay && selectedDay.dateString == date.dateString) {
            setSelectedDay(undefined);
        }
        else {
            setSelectedDay(date);
        }
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='History' {...headerProps} />
            <View style={{ flexGrow: 1, width: '100%' }}>
                <Calendar
                    {...calendarProps}
                    selectedDay={selectedDay}
                    onDaySelect={onDaySelect}
                    // Extra information from the theme to ensure the component rerenders correctly
                    themeKey={[themeColors.isDark, themeColors.accent, weekStartsOn]}
                />
            </View>
        </SafeAreaView>
    );
}