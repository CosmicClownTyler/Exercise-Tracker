import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TableView, Section, Cell } from 'react-native-tableview-simple';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import { useHistoryEntriesByDate } from '@/hooks/history';
import { selectPreferencesWeekStartsOn } from '@/store/preferences';

import { dateToDateData } from '@/lib/utils';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import Calendar from '@/Components/Calendar';

import type { DateData } from 'react-native-calendars';
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
    // The currently selected day
    const [selectedDay, setSelectedDay] = useState<DateData | null>(dateToDateData(new Date()));

    // Get necessary state
    const weekStartsOn = useAppSelector(state => selectPreferencesWeekStartsOn(state));

    // Use the entries for the current date
    const entries: HistoryEntry[] = useHistoryEntriesByDate(selectedDay ? selectedDay.dateString : null);

    // Use the theme colors
    const themeColors = useThemeColors();

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
        if (selectedDay && selectedDay.dateString == date.dateString) {
            setSelectedDay(null);
        }
        else {
            setSelectedDay(date);
        }
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='History' {...headerProps} />
            <View style={[{ width: '100%' }, selectedDay != null && entries.length > 0 ? {} : { flexGrow: 1 }]}>
                <Calendar
                    {...calendarProps}
                    selectedDay={selectedDay}
                    onDaySelect={onDaySelect}
                    // Extra information from the theme to ensure the component rerenders correctly
                    themeKey={[themeColors.isDark, themeColors.accent, weekStartsOn]}
                />
            </View>
            {selectedDay != null && entries.length > 0 &&
                <ScrollView {...scrollViewProps}>
                    <TableView>
                        <Section header={`${selectedDay.dateString}`} {...tableSectionProps}>
                            {entries.map((entry, index) => (
                                <Cell
                                    title={`Exercise #${entry.id}`}
                                    key={index}
                                    cellStyle='Basic'
                                    accessory='DisclosureIndicator'
                                    onPress={() => { navigation.navigate('Entry', { id: entry.id }); }}
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
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const textStyles = Styles.textStyles(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title={`Exercise #${route.params.id}`} leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <View style={{
                width: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={textStyles.menuText}>
                        Test {route.params.id}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};