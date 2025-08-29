import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

import type { HeaderProps } from '@/types/props';

export default function Header(props: HeaderProps) {
    // Deconstruct props
    const {
        title, titleStyle, imageColor, style,
        leftText, leftImage, onLeft,
        rightText, rightImage, onRight,
    } = props;

    // Initial empty left and right components
    let leftComponent = null;
    let leftTextComponent = null;
    let leftImageComponent = null;
    let rightComponent = null;
    let rightTextComponent = null;
    let rightImageComponent = null;
    // Warn if both a text and an image component was provided
    if (leftText && leftImage) console.warn('Both a left image and a left text component was passed to this header. ');
    if (rightText && rightImage) console.warn('Both a right image and a right text component was passed to this header. ');
    // Configure the left and right child components
    if (leftText) {
        leftTextComponent = (
            <Text style={[headerStyles.headerText, headerStyles.leftText, titleStyle]}>
                {leftText}
            </Text>
        );
    }
    if (leftImage) {
        leftImageComponent = (
            <Image
                tintColor={imageColor}
                source={leftImage}
                style={[headerStyles.headerImage, headerStyles.leftImage]}
            />
        );
    }
    if (rightText) {
        rightTextComponent = (
            <Text style={[headerStyles.headerText, headerStyles.rightText, titleStyle]}>
                {rightText}
            </Text>
        );
    }
    if (rightImage) {
        rightImageComponent = (
            <Image
                tintColor={imageColor}
                source={rightImage}
                style={[headerStyles.headerImage, headerStyles.rightImage]}
            />
        );
    }
    // Configure the left component
    if (onLeft) {
        // Warn if neither a text or an image component was provided but a button press handler was provided
        if (!leftText && !leftImage) console.warn('A button press is passed to this header without text or an image. ');

        if (leftText) {
            leftComponent = (
                <TouchableOpacity onPress={onLeft}>
                    {leftTextComponent}
                </TouchableOpacity>
            );
        }
        if (leftImage) {
            leftComponent = (
                <TouchableOpacity onPress={onLeft}>
                    {leftImageComponent}
                </TouchableOpacity>
            );
        }
    } else if (leftText) {
        leftComponent = leftTextComponent;
    } else if (leftImage) {
        leftComponent = leftImageComponent;
    }
    // Configure the right component
    if (onRight) {
        // Warn if neither a text or an image component was provided but a button press handler was provided
        if (!rightText && !rightImage) console.warn('A button press is passed to this header without text or an image. ');

        if (rightText) {
            rightComponent = (
                <TouchableOpacity onPress={onRight}>
                    {rightTextComponent}
                </TouchableOpacity>
            );
        }
        if (rightImage) {
            rightComponent = (
                <TouchableOpacity onPress={onRight}>
                    {rightImageComponent}
                </TouchableOpacity>
            );
        }
    } else if (rightText) {
        rightComponent = rightTextComponent;
    } else if (rightImage) {
        rightComponent = rightImageComponent;
    }

    return (
        <View style={[headerStyles.header, style]}>
            <View style={[headerStyles.outer, headerStyles.left]}>
                {leftComponent}
            </View>
            <View style={headerStyles.center}>
                <Text style={[headerStyles.headerText, titleStyle]}>
                    {title}
                </Text>
            </View>
            <View style={[headerStyles.outer, headerStyles.right]}>
                {rightComponent}
            </View>
        </View>
    );
};

const headerStyles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    outer: {
        flex: 1,
    },
    center: {
        flex: 3,
    },
    left: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    right: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
    },
    leftImage: {

    },
    rightImage: {

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    headerImage: {
        height: 20,
        aspectRatio: '1/1',
    },
});