import { useRef, useEffect } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';

import type { CheckboxProps } from '@/types/props';

export default function Checkbox(props: CheckboxProps) {
    // Deconstruct props with default values
    const {
        checked = false,
        onToggle,
        size = '100%',
        borderWidth = 1,
        borderRadius = 5,
        gapWidth = 1,
        gapRadius = borderRadius - gapWidth,
        color = '#ffffff',
        emptyColor = '#00000000',
        margin = 0,
    } = props;

    const checkedSize = useRef(new Animated.Value(0)).current;

    const animateCheck = (checked: boolean) => {
        Animated.timing(checkedSize, {
            toValue: checked ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    // Called everytime the checked value changes
    useEffect(() => {
        // Animate the checkbox
        animateCheck(checked);
    }, [checked]);

    return (
        <TouchableOpacity onPress={onToggle} style={{
            ...checkboxStyles.checkbox,
            height: size,
            aspectRatio: '1/1',
            backgroundColor: emptyColor,
            borderColor: color,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            padding: gapWidth,
            margin: margin,
        }}>
            <Animated.View
                style={{
                    ...checkboxStyles.checkboxFill,
                    backgroundColor: color,
                    borderRadius: gapRadius,
                    transform: [{
                        scale: checkedSize
                    }],
                }}
            />
        </TouchableOpacity>
    );
};

const checkboxStyles = StyleSheet.create({
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxFill: {
        width: '100%',
        height: '100%',
    },
});