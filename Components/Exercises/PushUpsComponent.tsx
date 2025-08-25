import { useState } from 'react';
import { View, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';

import { useThemeColors } from '@/hooks';

import * as Styles from '@/Styles/Styles';
import TextButton from '@/Components/TextButton';
import CircularProgress from '@/Components/CircularProgress';

import type { PushUpsComponentProps } from '@/types/props';

export default function PushUpsComponent(props: PushUpsComponentProps) {
    const themeColors = useThemeColors();
    const textStyles = Styles.textStyles(themeColors);
    const textButtonProps = Styles.textButtonProps(themeColors);
    const circularProgressProps = Styles.circularProgressProps(themeColors);

    const threshold = 0.2;
    const [subscribed, setSubscribed] = useState(false);
    const [startedSitup, setStartedSitup] = useState(false);
    const [situpCount, setSitupCount] = useState(0);

    // Data state for the x y z values of the accelerometer
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    // Event listener for the accelerometer
    const accelListener = ({ x, y, z }: { x: number, y: number, z: number }) => {
        setData({ x: x, y: y, z: z });
    };

    // Subscribe and unsubscribe to the listener
    const toggleSubscribed = () => { subscribed ? unsubscribe() : subscribe(); };
    const subscribe = () => {
        Accelerometer.addListener(accelListener);
        setSubscribed(true);
    };
    const unsubscribe = () => {
        Accelerometer.removeAllListeners();
        setSubscribed(false);
    };

    Accelerometer.setUpdateInterval(200);

    const isWithinThreshold = (x: number, y: number) => {
        const value = x - y;

        if (Math.abs(value) < threshold)
            return true;
        else
            return false;
    };

    const isPointingInDirection = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) => {
        // If any of the axis values are wrong, return false
        if (!isWithinThreshold(x0, x1)) return false;
        if (!isWithinThreshold(y0, y1)) return false;
        if (!isWithinThreshold(z0, z1)) return false;

        // If no axis values are wrong, return true
        return true;
    };

    const isPointingUp = (x: number, y: number, z: number) => {
        return isPointingInDirection(x, y, z, 0, -1, 0);
    };
    const isPointingDown = (x: number, y: number, z: number) => {
        return isPointingInDirection(x, y, z, 0, 1, 0);
    };
    const isPointingLeft = (x: number, y: number, z: number) => {
        return isPointingInDirection(x, y, z, -1, 0, 0);
    };
    const isPointingRight = (x: number, y: number, z: number) => {
        return isPointingInDirection(x, y, z, 1, 0, 0);
    };
    const isFlat = (x: number, y: number, z: number) => {
        return isPointingInDirection(x, y, z, 0, 0, -1);
    };
    const isFlatDown = (x: number, y: number, z: number) => {
        return isPointingInDirection(x, y, z, 0, 0, 1);
    };

    if (isFlatDown(x, y, z)) {
        if (!startedSitup) {
            setStartedSitup(true);
        }
    }
    if (startedSitup && (isPointingUp(x, y, z) || isPointingLeft(x, y, z) || isPointingRight(x, y, z))) {
        setStartedSitup(false);
        setSitupCount(situpCount + 1);
    }

    const [progress, setProgress] = useState(0);

    return (
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
        }}>
            {subscribed ?
                <Text style={[textStyles.menuText, { textAlign: 'center', marginBottom: 10 }]}>
                    {startedSitup ? 'Started Situp' : 'Waiting for situp'}
                </Text>
                : null}
            <Text style={[textStyles.menuText, { textAlign: 'center', marginBottom: 10 }]}>
                Situps: {situpCount}
            </Text>
            <TextButton {...textButtonProps} onPress={toggleSubscribed} style={{ marginBottom: 10 }}>
                {subscribed ? 'Turn Off' : 'Turn On'}
            </TextButton>

            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
            }}>
                <CircularProgress {...circularProgressProps} progress={progress} style={{ marginBottom: 10 }} />
            </View>

        </View>
    );
}




// import { useState } from 'react';
// import { View, Text } from 'react-native';
// import { Accelerometer } from 'expo-sensors';

// import { useSelector } from 'react-redux';

// import * as Styles from '../../Styles/Styles';
// import { TextButton } from '../TextButton';
// import { CircularProgress } from '../CircularProgress';

// export function SitUpComponent(props) {
//     const settings = useSelector(state => state.settings);
//     const theme = settings.theme;
//     const textStyles = Styles.textStyles(theme);

//     const threshold = 0.2;
//     const [subscribed, setSubscribed] = useState(false);
//     const [startedSitup, setStartedSitup] = useState(false);
//     const [situpCount, setSitupCount] = useState(0);

//     // Data state for the x y z values of the accelerometer
//     const [{ x, y, z }, setData] = useState({
//         x: 0,
//         y: 0,
//         z: 0,
//     });

//     // Event listener for the accelerometer
//     const accelListener = ({ x, y, z }) => {
//         setData({ x: x, y: y, z: z });
//     };

//     // Subscribe and unsubscribe to the listener
//     const toggleSubscribed = () => { subscribed ? unsubscribe() : subscribe(); };
//     const subscribe = () => {
//         Accelerometer.addListener(accelListener);
//         setSubscribed(true);
//     };
//     const unsubscribe = () => {
//         Accelerometer.removeAllListeners();
//         setSubscribed(false);
//     };

//     Accelerometer.setUpdateInterval(200);

//     const isWithinThreshold = (x, y) => {
//         const value = x - y;

//         if (Math.abs(value) < threshold)
//             return true;
//         else
//             return false;
//     };

//     const isPointingInDirection = (x0, y0, z0, x1, y1, z1) => {
//         // If any of the axis values are wrong, return false
//         if (!isWithinThreshold(x0, x1)) return false;
//         if (!isWithinThreshold(y0, y1)) return false;
//         if (!isWithinThreshold(z0, z1)) return false;

//         // If no axis values are wrong, return true
//         return true;
//     };

//     const isPointingUp = (x, y, z) => {
//         return isPointingInDirection(x, y, z, 0, -1, 0);
//     };
//     const isPointingDown = (x, y, z) => {
//         return isPointingInDirection(x, y, z, 0, 1, 0);
//     };
//     const isPointingLeft = (x, y, z) => {
//         return isPointingInDirection(x, y, z, -1, 0, 0);
//     };
//     const isPointingRight = (x, y, z) => {
//         return isPointingInDirection(x, y, z, 1, 0, 0);
//     };
//     const isFlat = (x, y, z) => {
//         return isPointingInDirection(x, y, z, 0, 0, -1);
//     };
//     const isFlatDown = (x, y, z) => {
//         return isPointingInDirection(x, y, z, 0, 0, 1);
//     };

//     if (isFlatDown(x, y, z)) {
//         if (!startedSitup) {
//             setStartedSitup(true);
//         }
//     }
//     if (startedSitup && (isPointingUp(x, y, z) || isPointingLeft(x, y, z) || isPointingRight(x, y, z))) {
//         setStartedSitup(false);
//         setSitupCount(situpCount + 1);
//     }

//     const [progress, setProgress] = useState(0);

//     return (
//         <View style={{
//             width: '100%',
//             height: '100%',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: 20,
//         }}>
//             {subscribed ?
//                 <Text style={[textStyles.menuText, { textAlign: 'center', marginBottom: 10 }]}>
//                     {startedSitup ? 'Started Situp' : 'Waiting for situp'}
//                 </Text>
//                 : null}
//             <Text style={[textStyles.menuText, { textAlign: 'center', marginBottom: 10 }]}>
//                 Situps: {situpCount}
//             </Text>
//             <TextButton onPress={toggleSubscribed} style={{ marginBottom: 10 }}>
//                 {subscribed ? 'Turn Off' : 'Turn On'}
//             </TextButton>

//             <View style={{
//                 width: '100%',
//                 height: '100%',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: 20,
//             }}>
//                 <CircularProgress progress={progress} style={{ marginBottom: 10 }} />
//             </View>

//         </View>
//     );
// }