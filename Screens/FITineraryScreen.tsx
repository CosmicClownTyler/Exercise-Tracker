import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useThemeColors } from '@/hooks/theme';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';

import type { FITineraryStackParamList } from '@/types/types';
import type { FITineraryLandingProps } from '@/types/props';

const FITineraryStack = createNativeStackNavigator<FITineraryStackParamList>();

export default function FITineraryScreen() {
    return (
        <FITineraryStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <FITineraryStack.Screen name='Landing' component={Landing} />
        </FITineraryStack.Navigator>
    );
};

function Landing({ navigation, route }: FITineraryLandingProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='FITinerary' {...headerProps} />

        </SafeAreaView>
    );
};