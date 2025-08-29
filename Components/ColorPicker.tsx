import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Accents } from '@/Styles/Colors';

import type { ColorPickerProps } from '@/types/props';

export default function ColorPicker(props: ColorPickerProps) {
    // Deconstruct props
    const { onChange, style, buttonStyle } = props;

    return (
        <View style={[colorPickerStyles.colorGridMenu, style]}>
            {Object.values(Accents).map((accent, index) => (
                <TouchableOpacity
                    style={[colorPickerStyles.colorGridButton, buttonStyle, { backgroundColor: accent }]}
                    onPress={() => { if (onChange) onChange(accent); }}
                    key={index}
                />
            ))}
        </View>
    );
};

const colorPickerStyles = StyleSheet.create({
    colorGridMenu: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    colorGridButton: {
        flexBasis: '30%',
        aspectRatio: '2/1',
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
});