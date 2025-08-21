import { SafeAreaView, View } from 'react-native';

import { useAppSelector } from '@/hooks';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import Calendar from '@/Components/Calendar';

export default function CalendarScreen() {
    const settings = useAppSelector(state => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);
    const calendarProps = Styles.calendarProps(settings);

    return (
        <SafeAreaView style={containerStyles.container}>
            <Header title='Calendar' {...headerProps} />
            <View style={{ flexGrow: 1, width: '100%' }}>
                <Calendar
                    {...calendarProps}
                    // Extra information from the theme to ensure the component rerenders correctly
                    themeKey={[settings.theme.isDark, settings.theme.colors.accent as string]}
                />
            </View>
        </SafeAreaView>
    );
}