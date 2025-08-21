import { useEffect } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { OrientationLock, lockAsync } from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { darkSystemColorScheme, lightSystemColorScheme, undefinedSystemColorScheme } from '@/store/theme';

import { CalendarIcon, CheckmarkIcon, SettingsIcon } from '@/Components/TabBarIcons';
import CalendarScreen from '@/Screens/CalendarScreen';
import HomeScreen from '@/Screens/HomeScreen';
import SettingsScreen from '@/Screens/SettingsScreen';

import { RootBottomTabParamList, ColorHex } from '@/types/types';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppComponent />
            </PersistGate>
        </Provider>
    );
};

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export function AppComponent() {
    // Get the redux store dispatch
    const dispatch = useAppDispatch();

    // Get the settings state
    const settings = useAppSelector(state => state.settings);
    const theme = settings.theme;

    // Get the device color scheme
    const systemColorScheme = useColorScheme();

    // Set the system color scheme based on user's device preferences
    useEffect(() => {
        if (systemColorScheme == 'dark') {
            dispatch(darkSystemColorScheme());
        }
        else if (systemColorScheme == 'light') {
            dispatch(lightSystemColorScheme());
        }
        else {
            dispatch(undefinedSystemColorScheme());
        }
    }, [systemColorScheme, dispatch]);

    // Set the orientation lock for the application
    lockAsync(OrientationLock.PORTRAIT_UP);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={theme.colors.background} barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    // Header options
                    headerShown: false,
                    // Bottom tab options
                    tabBarStyle: {
                        backgroundColor: theme.colors.background,
                        borderTopColor: theme.colors.borders,
                        borderTopWidth: 1,
                    },
                    tabBarInactiveTintColor: theme.colors.secondary,
                    tabBarActiveTintColor: theme.colors.accent,
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === 'Calendar')
                            return <CalendarIcon color={color as ColorHex} size={size} />;
                        if (route.name === 'Home')
                            return <CheckmarkIcon color={color as ColorHex} size={size} />;
                        if (route.name === 'Settings')
                            return <SettingsIcon color={color as ColorHex} size={size} />;
                    },
                })}
            >
                <Tab.Screen name='Calendar' component={CalendarScreen} />
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Settings' component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};