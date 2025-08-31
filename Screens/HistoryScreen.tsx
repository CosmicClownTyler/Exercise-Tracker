import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TableView, Section, Cell } from 'react-native-tableview-simple';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import { useHistoryEntriesByDate, useHistoryEntriesByPartialDate } from '@/hooks/history';
import { selectPreferencesWeekStartsOn } from '@/store/preferences';

import { dateToDateData } from '@/lib/utils';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import Calendar from '@/Components/Calendar';
import HistoryEntryComponent from '@/Components/HistoryEntryComponent';

import type { DateData, MarkedDates } from 'react-native-calendars/src/types';
import type { HistoryStackParamList, HistoryEntry } from '@/types/types';
import type { HistoryLandingProps, EntryProps } from '@/types/props';

const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();

export default function HistoryScreen() {
    return (
        <HistoryStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <HistoryStack.Screen name='Landing' component={Landing} />
            <HistoryStack.Screen name='Entry' component={Entry} />
        </HistoryStack.Navigator>
    );
};

function Landing({ navigation, route }: HistoryLandingProps) {
    // The currently shown month and selected date
    const [shownMonth, setShownMonth] = useState<DateData>(dateToDateData(new Date()));
    const [selectedDate, setSelectedDate] = useState<DateData | null>(dateToDateData(new Date()));

    // Get necessary state
    const weekStartsOn = useAppSelector(state => selectPreferencesWeekStartsOn(state));
    const monthEntries: HistoryEntry[] = useHistoryEntriesByPartialDate(shownMonth.dateString.substring(0, 7));
    const dayEntries: HistoryEntry[] = useHistoryEntriesByDate(selectedDate ? selectedDate.dateString : null);

    // Use the theme colors
    const themeColors = useThemeColors();

    // Set the marked dates using entries from this month
    let markedDates: MarkedDates = {};
    monthEntries.map((entry: HistoryEntry) => {
        markedDates[entry.date] = {
            marked: true,
            dots: [{ color: themeColors.accent }],
        };
    });

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const calendarProps = Styles.calendarProps(themeColors, weekStartsOn);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);

    // Function for selecting days
    const onDaySelect = (date: DateData) => {
        // If pressing the currently selected date, clear the selection
        if (selectedDate && selectedDate.dateString == date.dateString) {
            setSelectedDate(null);
        }
        else {
            setSelectedDate(date);
        }
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='History' {...headerProps} />
            <View style={[{ width: '100%' }, selectedDate != null && dayEntries.length > 0 ? {} : { flexGrow: 1 }]}>
                <Calendar
                    {...calendarProps}
                    selectedDay={selectedDate}
                    onDaySelect={onDaySelect}
                    onMonthSelect={setShownMonth}
                    markedDates={markedDates}
                    // Extra information from the theme to ensure the component rerenders correctly
                    themeKey={[themeColors.isDark, themeColors.accent, weekStartsOn]}
                />
            </View>
            {selectedDate != null && dayEntries.length > 0 &&
                <ScrollView {...scrollViewProps}>
                    <TableView>
                        <Section header={`${selectedDate.dateString}`} {...tableSectionProps}>
                            {dayEntries.map((entry, index) => (
                                <Cell
                                    title={entry.exercise}
                                    key={index}
                                    cellStyle='Subtitle'
                                    accessory='DisclosureIndicator'
                                    detail={entry.count}
                                    onPress={() => { navigation.navigate('Entry', { id: entry.id }); }}
                                    contentContainerStyle={{ paddingVertical: 5 }}
                                    {...tableCellProps}
                                />
                            ))}
                        </Section>
                    </TableView>
                </ScrollView>
            }
        </SafeAreaView>
    );
};

function Entry({ navigation, route }: EntryProps) {
    // Deconstruct route params
    const { id } = route.params;

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Edit Entry' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <HistoryEntryComponent entryId={id} onSubmit={() => { navigation.goBack(); }} />
        </SafeAreaView>
    );
};