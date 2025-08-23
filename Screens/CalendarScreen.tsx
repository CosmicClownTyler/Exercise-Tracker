import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColors } from '@/hooks';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import Calendar from '@/Components/Calendar';

export default function CalendarScreen() {
    const themeColors = useThemeColors();
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const calendarProps = Styles.calendarProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Calendar' {...headerProps} />
            <View style={{ flexGrow: 1, width: '100%' }}>
                <Calendar
                    {...calendarProps}
                    // Extra information from the theme to ensure the component rerenders correctly
                    themeKey={[themeColors.isDark, themeColors.accent]}
                />
            </View>
        </SafeAreaView>
    );
}