import { SafeAreaView, ScrollView } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TableView, Section, Cell } from 'react-native-tableview-simple';

import { useSelector, useDispatch } from 'react-redux';
import { automaticColorScheme, darkColorScheme, lightColorScheme, automaticAccentColor, customAccentColor, setThemeAccentColor } from '@/store/theme';
import { taskViewFullscreen, taskViewPopup } from '@/store/preferences';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import ColorPicker from '@/Components/ColorPicker';

import { ColorHex, SettingsStackParamList, StoreState } from '@/types/types';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsScreen() {
    return (
        <SettingsStack.Navigator initialRouteName='Settings2' screenOptions={{ headerShown: false }} >
            <SettingsStack.Screen name='Settings2' component={Settings} />
            <SettingsStack.Screen name='DateTime' component={DateTime} />
            <SettingsStack.Screen name='Notifications' component={Notifications} />
            <SettingsStack.Screen name='Theme' component={Theme} />
        </SettingsStack.Navigator>
    );
}

type SettingsProps = NativeStackScreenProps<SettingsStackParamList, 'Settings2'>;
type DateTimeProps = NativeStackScreenProps<SettingsStackParamList, 'DateTime'>;
type NotificationsProps = NativeStackScreenProps<SettingsStackParamList, 'Notifications'>;
type ThemeProps = NativeStackScreenProps<SettingsStackParamList, 'Theme'>;

function Settings({ navigation, route }: SettingsProps) {
    const settings = useSelector((state: StoreState) => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);
    const scrollViewProps = Styles.scrollViewProps(settings);
    const tableSectionProps = Styles.tableSectionProps(settings);
    const tableCellProps = Styles.tableCellProps(settings);

    return (
        <SafeAreaView style={containerStyles.container}>
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
    const settings = useSelector((state: StoreState) => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);
    const scrollViewProps = Styles.scrollViewProps(settings);

    return (
        <SafeAreaView style={containerStyles.container}>
            <Header title='Date & Time' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}

function Notifications({ navigation, route }: NotificationsProps) {
    const settings = useSelector((state: StoreState) => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);
    const scrollViewProps = Styles.scrollViewProps(settings);

    return (
        <SafeAreaView style={containerStyles.container}>
            <Header title='Notifications' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <ScrollView {...scrollViewProps}>
                <TableView>
                </TableView>
            </ScrollView>
        </SafeAreaView>
    );
}

function Theme({ navigation, route }: ThemeProps) {
    const settings = useSelector((state: StoreState) => state.settings);
    const theme = settings.theme;
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);
    const scrollViewProps = Styles.scrollViewProps(settings);
    const tableSectionProps = Styles.tableSectionProps(settings);
    const tableCellProps = Styles.tableCellProps(settings);
    const colorPickerProps = Styles.colorPickerProps(settings);

    const dispatch = useDispatch();

    // Functions for changing theme scheme and accent color
    const setSchemeAutomatic = () => {
        // dispatch(automaticColorScheme());
    };
    const setSchemeDark = () => {
        // dispatch(darkColorScheme());
    };
    const setSchemeLight = () => {
        // dispatch(lightColorScheme());
    };
    const setAccentDefault = () => {
        // dispatch(automaticAccentColor());
    };
    const setAccentCustom = () => {
        // dispatch(customAccentColor());
    };
    const setAccentColor = (color: ColorHex) => {
        dispatch(setThemeAccentColor(color));
    };

    return (
        <SafeAreaView style={containerStyles.container}>
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