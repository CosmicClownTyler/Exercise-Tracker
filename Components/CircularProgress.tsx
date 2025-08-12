import React, { useRef, useEffect } from 'react';
import { Dimensions, Animated, View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

import { CircularProgressProps } from '@/types/props';

export default function CircularProgress(props: CircularProgressProps) {
    // Deconstruct props with default values
    const {
        size = Math.min(Dimensions.get('window').width / 2, 300),
        backgroundWidth = size / 10,
        progressWidth = size / 10 - size / 20,
        backgroundColor = '#004488',
        progressColor = '#0088ff',
        progress: inputProgress = 0,
        style,
    } = props;

    // Clamp the progress between 0 and 100
    const progress = inputProgress >= 100 ? 100 : inputProgress <= 0 ? 0 : inputProgress;

    // The center of the circle
    const center = size / 2;
    // The larger of the two circle widths
    const maxCircleWidth = Math.max(backgroundWidth, progressWidth);
    // The radius equals the size divided by 2 minus half of the greater circle width
    const radius = size / 2 - maxCircleWidth / 2;

    // The background path and progress path forming the circular progress bar
    let backgroundPath = fullCirclePath(radius, center);
    let progressPath: string = '';

    // A ref for the animated progress path
    const pathRef = useRef<Path>(null);

    // A ref for the animated progress value
    const animatedProgress = useRef(new Animated.Value(0)).current;

    // The animation for the progress value
    const animateProgress = (toValue: number) => {
        Animated.timing(animatedProgress, {
            toValue: toValue,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Called everytime the progress value changes
    useEffect(() => {
        // Animate the progress
        animateProgress(progress);

        // Add a listener for the animated progress value
        animatedProgress.addListener(event => {
            // If the path ref exists animate the path
            if (pathRef && pathRef.current) {
                // Calculate the new progress circle path
                progressPath = progressCirclePath(radius, center, event.value);

                // Update the path ref's path prop
                pathRef.current.setNativeProps({
                    d: progressPath
                });
            }
        });
    }, [progress]);

    return (
        <View style={style}>
            <Svg width={size} height={size}>
                <Path
                    d={backgroundPath}
                    stroke={backgroundColor}
                    strokeWidth={backgroundWidth || progressWidth}
                    strokeLinecap='butt'
                    fill='transparent'
                />
                <AnimatedPath
                    ref={pathRef}
                    d={progressPath}
                    stroke={progressColor}
                    strokeWidth={progressWidth}
                    strokeLinecap='round'
                    fill='transparent'
                />
            </Svg>
            <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: radius - (radius / 4),
                    fontWeight: '200',
                }}>
                    {progress}
                </Text>
            </View>
        </View>
    );
}

// A function for converting from polar coordinates (radius, angle) to cartesian coordinates (x, y)
const polarToCartesian = (radius: number, angleInDegrees: number) => {
    const angleInRadians = angleInDegrees * Math.PI / 180;
    return {
        x: radius * Math.cos(angleInRadians),
        y: radius * Math.sin(angleInRadians),
    };
};

// A function that returns a full circle path
const fullCirclePath = (radius: number, center: number) => {
    // The start angle should be the top (-90) and the end should be the bottom (90)
    const startAngle = -90;
    const endAngle = 90;

    // Convert the polar coordinates to cartesian coordinates (x, y)
    const start = polarToCartesian(radius, endAngle);
    const end = polarToCartesian(radius, startAngle);

    // Add the center offset value to the coordinates
    const x1 = start.x + center;
    const y1 = start.y + center;
    const x2 = end.x + center;
    const y2 = end.y + center;

    const d = [
        'M', x1, y1, // move to the center
        'A', radius, radius, 0, 0, 0, x2, y2, // arc going down making half the circle
        'A', radius, radius, 0, 0, 0, x1, y1, // arc going back up completing the circle
    ];
    return d.join(' ');
};

// A function that returns a partial circle path depending on the fill value (0-100)
const partialCirclePath = (radius: number, center: number, fill: number) => {
    // Subtract 90 degrees from the angles to set the top as the start
    const startAngle = -90;
    const endAngle = (fill / 100) * 360 - 90;

    // Convert the polar coordinates to cartesian coordinates (x, y)
    const start = polarToCartesian(radius, endAngle);
    const end = polarToCartesian(radius, startAngle);

    // Add the center offset value to the coordinates
    const x1 = start.x + center;
    const y1 = start.y + center;
    const x2 = end.x + center;
    const y2 = end.y + center;

    // Determine whether or not to set the large arc flag
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = ['M', x1, y1, 'A', radius, radius, 0, largeArcFlag, 0, x2, y2];
    return d.join(' ');
};

// A function that returns a circle path for the progress amount
const progressCirclePath = (radius: number, center: number, progress: number) => {
    // Draw a full circle if the progress is at 100%
    if (progress == 100) {
        return fullCirclePath(radius, center);
    }
    // Otherwise draw a partial circle
    else {
        return partialCirclePath(radius, center, progress);
    }
};