import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { TextButtonProps } from '@/types/props';

export default function TextButton(props: TextButtonProps) {
    // Deconstruct props
    const { onPress, style, textStyle, children } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[buttonStyles.button, style]}
        >
            <Text style={[buttonStyles.buttonText, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
export function TextButtonSquare(props: TextButtonProps) {
    // Deconstruct props
    const { onPress, style, textStyle, children } = props;

    return (
        <TextButton
            onPress={onPress}
            style={[buttonStylesSquare.button, style]}
            textStyle={textStyle}
        >
            {children}
        </TextButton>
    );
}

const buttonStyles = StyleSheet.create({
    button: {
        width: '50%',
        borderWidth: 1,
        borderRadius: 70,
        padding: 10,
        backgroundColor: '#000000',
        borderColor: '#ffffff',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        color: '#ffffff',
    },
});
const buttonStylesSquare = StyleSheet.create({
    button: {
        width: '35%',
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderColor: '#ffffff',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 30,
        color: '#ffffff',
    },
});