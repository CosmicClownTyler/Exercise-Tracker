import { Image } from 'react-native';

import type { TabBarIconProps } from '@/types/props';

export function CalendarIcon({ color, size }: TabBarIconProps) {
    return (<Image
        tintColor={color}
        source={require('@/assets/icons/calendar.png')}
        style={{
            width: size,
            height: size,
        }}
    />);
}

export function CalendarCheckmarkIcon({ color, size }: TabBarIconProps) {
    return (<Image
        tintColor={color}
        source={require('@/assets/icons/calendar-checkmark.png')}
        style={{
            width: size,
            height: size,
        }}
    />);
}

export function CheckmarkIcon({ color, size }: TabBarIconProps) {
    return (<Image
        tintColor={color}
        source={require('@/assets/icons/checkmark.png')}
        style={{
            width: size,
            height: size,
        }}
    />);
}

export function HistoryIcon({ color, size }: TabBarIconProps) {
    return (<Image
        tintColor={color}
        source={require('@/assets/icons/history.png')}
        style={{
            width: size,
            height: size,
        }}
    />);
}

export function SettingsIcon({ color, size }: TabBarIconProps) {
    return (<Image
        tintColor={color}
        source={require('@/assets/icons/settings.png')}
        style={{
            width: size,
            height: size,
        }}
    />);
}