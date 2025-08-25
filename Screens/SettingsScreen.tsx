import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TableView, Section, Cell } from 'react-native-tableview-simple';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useThemeColors, useAppSelector, useAppDispatch } from '@/hooks';
import { automaticColorScheme, darkColorScheme, lightColorScheme, automaticAccentColor, customAccentColor, setThemeAccentColor } from '@/store/theme';
import { setWeekStartsOn } from '@/store/preferences';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import ColorPicker from '@/Components/ColorPicker';

import { Weekday } from '@/types/types';
import type { SettingsStackParamList, ColorHex } from '@/types/types';
import type { SettingsLandingProps, DateTimeProps, NotificationsProps, ThemeProps } from '@/types/props';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsScreen() {
    return (
        <SettingsStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <SettingsStack.Screen name='Landing' component={Landing} />
            <SettingsStack.Screen name='DateTime' component={DateTime} />
            <SettingsStack.Screen name='Notifications' component={Notifications} />
            <SettingsStack.Screen name='Theme' component={Theme} />
        </SettingsStack.Navigator>
    );
}

function Landing({ navigation, route }: SettingsLandingProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);
    const tableSectionProps = Styles.tableSectionProps(themeColors);
    const tableCellProps = Styles.tableCellProps(themeColors);

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
                    </Section>
                    <Section header='Display & Appearance' {...tableSectionProps}>
                        <Cell
                            title='Theme & Colors'
                            cellStyle='Basic'
                            accessory='DisclosureIndicator'
                            onPress={() => { navigation.navigate('Theme'); }}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}

function DateTime({ navigation, route }: DateTimeProps) {
    // Get necessary state
    const dispatch = useAppDispatch();
    const weekStartsOn = useAppSelector(state => state.settings.preferences.weekStartsOn);

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
}

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
}

function Theme({ navigation, route }: ThemeProps) {
    // Get necessary state
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.settings.theme);

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
                            accessory={theme.colorScheme == 'system' ? 'Checkmark' : undefined}
                            onPress={setSchemeAutomatic}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Dark'
                            cellStyle='Basic'
                            accessory={theme.colorScheme == 'dark' ? 'Checkmark' : undefined}
                            onPress={setSchemeDark}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Light'
                            cellStyle='Basic'
                            accessory={theme.colorScheme == 'light' ? 'Checkmark' : undefined}
                            onPress={setSchemeLight}
                            {...tableCellProps}
                        />
                    </Section>
                    <Section header='Accent Colors' {...tableSectionProps}>
                        <Cell
                            title='Default'
                            cellStyle='Basic'
                            accessory={theme.accentType == 'default' ? 'Checkmark' : undefined}
                            onPress={setAccentDefault}
                            {...tableCellProps}
                        />
                        <Cell
                            title='Custom'
                            cellStyle='Basic'
                            accessory={theme.accentType == 'custom' ? 'Checkmark' : undefined}
                            onPress={setAccentCustom}
                            {...tableCellProps}
                        />
                    </Section>
                </TableView>
                {theme.accentType == 'custom' ?
                    <ColorPicker onChange={setAccentColor} {...colorPickerProps} /> : null}
            </ScrollView>
        </SafeAreaView>
    );
}