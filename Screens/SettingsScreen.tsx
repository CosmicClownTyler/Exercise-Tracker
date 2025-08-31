import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TableView, Section, Cell } from 'react-native-tableview-simple';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import {
    revertToDefaultPreferences,
    selectPreferencesWeekStartsOn,
    selectPreferencesExercisesListView,
    selectPreferencesManualEntryFloatingButton,
    selectPreferencesConfirmBeforeDeletingEntry,
    selectPreferencesSitUpsDeviceHorizontal,
    setWeekStartsOn,
    exercisesListView,
    exercisesGridView,
    manualEntryFloatingButton,
    manualEntryFixedButton,
    confirmBeforeDeletingEntry,
    doNotConfirmBeforeDeletingEntry,
} from '@/store/preferences';
import {
    revertToDefaultTheme,
    selectThemeColorScheme,
    selectThemeAccentType,
    automaticColorScheme,
    darkColorScheme,
    lightColorScheme,
    automaticAccentColor,
    customAccentColor,
    setThemeAccentColor,
} from '@/store/theme';
import { revertToDefaultHistory } from '@/store/history';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import ColorPicker from '@/Components/ColorPicker';

import { Weekday } from '@/types/types';
import type { SettingsStackParamList, ColorHex } from '@/types/types';
import type { SettingsLandingProps, DateTimeProps, NotificationsProps, BehaviourProps, LayoutProps, ThemeProps } from '@/types/props';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsScreen() {
    return (
        <SettingsStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <SettingsStack.Screen name='Landing' component={Landing} />
            <SettingsStack.Screen name='DateTime' component={DateTime} />
            <SettingsStack.Screen name='Notifications' component={Notifications} />
            <SettingsStack.Screen name='Behaviour' component={Behaviour} />
            <SettingsStack.Screen name='Layout' component={Layout} />
            <SettingsStack.Screen name='Theme' component={Theme} />
        </SettingsStack.Navigator>
    );
};

function Landing({ navigation, route }: SettingsLandingProps) {
    // Get necessary state
    const dispatch = useAppDispatch();

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);

    // Reset the theme
    const resetTheme = () => {
        Alert.alert(
            "Reset Theme?",
            "This will reset the app's theme but will not reset any other settings or clear any saved exercises.",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => dispatch(revertToDefaultTheme()),
                },
            ],
            {
                cancelable: true,
            }
        );
    }
    // Reset all preferences
    const resetPreferences = () => {
        Alert.alert(
            "Reset Settings?",
            "This will reset the app's settings but will not clear any saved exercises.",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => dispatch(revertToDefaultPreferences()),
                },
            ],
            {
                cancelable: true,
            }
        );
    }
    // Reset the history data
    const resetData = () => {
        Alert.alert(
            "Clear History Data?",
            "This will clear all saved exercises and data.",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => dispatch(revertToDefaultHistory()),
                },
            ],
            {
                cancelable: true,
            }
        );
    }

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Settings' {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                    <Section header='General' {...tableSectionProps}>
                        <Cell
                            title='Date & Time'
                            cellStyle='Basic'
                            accessory='DisclosureIndicator'
                            onPress={() => { navigation.navigate('DateTime'); }}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Notifications'
                            cellStyle='Basic'
                            accessory='DisclosureIndicator'
                            onPress={() => { navigation.navigate('Notifications'); }}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Behaviour'
                            cellStyle='Basic'
                            accessory='DisclosureIndicator'
                            onPress={() => { navigation.navigate('Behaviour'); }}
                            {...tableCellProps}
                        />
                    </Section>
                    <Section header='Display & Appearance' {...tableSectionProps}>
                        <Cell
                            title='Layout'
                            cellStyle='Basic'
                            accessory='DisclosureIndicator'
                            onPress={() => { navigation.navigate('Layout'); }}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Theme & Colors'
                            cellStyle='Basic'
                            accessory='DisclosureIndicator'
                            onPress={() => { navigation.navigate('Theme'); }}
                            {...tableCellProps}
                        />
                    </Section>
                    <Section header='Reset' {...tableSectionProps}>
                        <Cell
                            title='Reset Theme'
                            cellStyle='Basic'
                            titleTextStyle={{ color: 'red' }}
                            onPress={resetTheme}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Reset Settings'
                            cellStyle='Basic'
                            titleTextStyle={{ color: 'red' }}
                            onPress={resetPreferences}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Clear History Data'
                            cellStyle='Basic'
                            titleTextStyle={{ color: 'red' }}
                            onPress={resetData}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
};

function DateTime({ navigation, route }: DateTimeProps) {
    // Get necessary state
    const dispatch = useAppDispatch();
    const weekStartsOn = useAppSelector(state => selectPreferencesWeekStartsOn(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);

    // Functions for changing preferences
    const setWeekStartDay = (day: Weekday) => {
        dispatch(setWeekStartsOn(day));
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Date & Time' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                    <Section header='First Day of the Week' {...tableSectionProps}>
                        <Cell
                            title='Sunday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Sunday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Sunday)}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Monday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Monday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Monday)}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Tuesday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Tuesday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Tuesday)}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Wednesday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Wednesday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Wednesday)}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Thursday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Thursday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Thursday)}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Friday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Friday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Friday)}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Saturday'
                            cellStyle='Basic'
                            accessory={weekStartsOn == Weekday.Saturday ? 'Checkmark' : undefined}
                            onPress={() => setWeekStartDay(Weekday.Saturday)}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
};
function Notifications({ navigation, route }: NotificationsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Notifications' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
};
function Behaviour({ navigation, route }: BehaviourProps) {
    // Get necessary state
    const dispatch = useAppDispatch();
    const shouldConfirmBeforeDeletingEntry = useAppSelector(state => selectPreferencesConfirmBeforeDeletingEntry(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);

    // Functions for changing behaviour
    const setConfirmBeforeDeletingEntry = () => {
        dispatch(confirmBeforeDeletingEntry());
    };
    const setDoNotConfirmBeforeDeletingEntry = () => {
        dispatch(doNotConfirmBeforeDeletingEntry());
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Behaviour' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                    <Section header='Confirm Before Deleting Entry' {...tableSectionProps}>
                        <Cell
                            title='Yes'
                            cellStyle='Basic'
                            accessory={shouldConfirmBeforeDeletingEntry ? 'Checkmark' : undefined}
                            onPress={setConfirmBeforeDeletingEntry}
                            {...tableCellProps}
                        />
                        <Cell
                            title='No'
                            cellStyle='Basic'
                            accessory={!shouldConfirmBeforeDeletingEntry ? 'Checkmark' : undefined}
                            onPress={setDoNotConfirmBeforeDeletingEntry}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
};

function Layout({ navigation, route }: LayoutProps) {
    // Get necessary state
    const dispatch = useAppDispatch();
    const isExercisesListView = useAppSelector(state => selectPreferencesExercisesListView(state));
    const isManualEntryFloatingButton = useAppSelector(state => selectPreferencesManualEntryFloatingButton(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);

    // Functions for changing layout
    const setExercisesListView = () => {
        dispatch(exercisesListView());
    };
    const setExercisesGridView = () => {
        dispatch(exercisesGridView());
    };
    const setManualEntryFloatingButton = () => {
        dispatch(manualEntryFloatingButton());
    };
    const setManualEntryFixedButton = () => {
        dispatch(manualEntryFixedButton());
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Layout' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                    <Section header='Exercises Layout' {...tableSectionProps}>
                        <Cell
                            title='List'
                            cellStyle='Basic'
                            accessory={isExercisesListView ? 'Checkmark' : undefined}
                            onPress={setExercisesListView}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Grid'
                            cellStyle='Basic'
                            accessory={!isExercisesListView ? 'Checkmark' : undefined}
                            onPress={setExercisesGridView}
                            {...tableCellProps}
                        />
                    </Section>
                    <Section header='Manual Exercise Entry Button' {...tableSectionProps}>
                        <Cell
                            title='Floating Button'
                            cellStyle='Basic'
                            accessory={isManualEntryFloatingButton ? 'Checkmark' : undefined}
                            onPress={setManualEntryFloatingButton}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Fixed Button'
                            cellStyle='Basic'
                            accessory={!isManualEntryFloatingButton ? 'Checkmark' : undefined}
                            onPress={setManualEntryFixedButton}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
};
function Theme({ navigation, route }: ThemeProps) {
    // Get necessary state
    const dispatch = useAppDispatch();
    const themeColorScheme = useAppSelector(state => selectThemeColorScheme(state));
    const themeAccentType = useAppSelector(state => selectThemeAccentType(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);
    const colorPickerProps = Styles.colorPickerProps(themeColors);

    // Functions for changing theme scheme and accent color
    const setSchemeAutomatic = () => {
        dispatch(automaticColorScheme());
    };
    const setSchemeDark = () => {
        dispatch(darkColorScheme());
    };
    const setSchemeLight = () => {
        dispatch(lightColorScheme());
    };
    const setAccentDefault = () => {
        dispatch(automaticAccentColor());
    };
    const setAccentCustom = () => {
        dispatch(customAccentColor());
    };
    const setAccentColor = (color: ColorHex) => {
        dispatch(setThemeAccentColor(color));
    };

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Theme & Colors' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                    <Section header='Theme' {...tableSectionProps}>
                        <Cell
                            title='System'
                            cellStyle='Basic'
                            accessory={themeColorScheme == 'system' ? 'Checkmark' : undefined}
                            onPress={setSchemeAutomatic}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Dark'
                            cellStyle='Basic'
                            accessory={themeColorScheme == 'dark' ? 'Checkmark' : undefined}
                            onPress={setSchemeDark}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Light'
                            cellStyle='Basic'
                            accessory={themeColorScheme == 'light' ? 'Checkmark' : undefined}
                            onPress={setSchemeLight}
                            {...tableCellProps}
                        />
                    </Section>
                    <Section header='Accent Colors' {...tableSectionProps}>
                        <Cell
                            title='Default'
                            cellStyle='Basic'
                            accessory={themeAccentType == 'default' ? 'Checkmark' : undefined}
                            onPress={setAccentDefault}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Custom'
                            cellStyle='Basic'
                            accessory={themeAccentType == 'custom' ? 'Checkmark' : undefined}
                            onPress={setAccentCustom}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
                {themeAccentType == 'custom' ?
                    <ColorPicker onChange={setAccentColor} {...colorPickerProps} /> : null}
            </ScrollView>
        </SafeAreaView>
    );
};
