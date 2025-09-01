import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useThemeColors } from '@/hooks/theme';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import SitupsComponent from '@/Components/Exercises/SitupsComponent';
import HistoryEntryComponent from '@/Components/HistoryEntryComponent';

import type { SitupsStackParamList } from '@/types/types';
import type { SitupsLandingProps, HistoryEntryProps } from '@/types/props';

const SitupsStack = createNativeStackNavigator<SitupsStackParamList>();

export default function SitupsScreen() {
    return (
        <SitupsStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <SitupsStack.Screen name='Landing' component={Landing} />
            <SitupsStack.Screen name='HistoryEntry' component={HistoryEntry} />
        </SitupsStack.Navigator>
    );
};

function Landing({ navigation, route }: SitupsLandingProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Situps' rightImage={require('@/assets/icons/plus.png')} onRight={() => navigation.navigate('HistoryEntry')} {...headerProps} />
            <SitupsComponent onSubmit={() => { navigation.goBack(); navigation.getParent()?.navigate('History'); }} />
        </SafeAreaView>
    );
};
function HistoryEntry({ navigation, route }: HistoryEntryProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Manual Entry' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <HistoryEntryComponent onSubmit={() => { navigation.goBack(); navigation.getParent()?.navigate('History'); }} />
        </SafeAreaView>
    );
};