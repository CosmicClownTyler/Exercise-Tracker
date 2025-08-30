import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import type { ImageButtonProps } from '@/types/props';

export default function ImageButton(props: ImageButtonProps) {
    // Deconstruct props
    const { onPress, style, src, color, size } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[buttonStyles.button, style]}
        >
            <Image
                tintColor={color}
                source={src}
                style={{
                    width: size,
                    height: size,
                }}
            />
        </TouchableOpacity>
    );
};

const buttonStyles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 9999,
        padding: 15,
        backgroundColor: '#000000',
        borderColor: '#ffffff',
    },
});