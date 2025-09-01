import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Accelerometer } from 'expo-sensors';

import { useAppDispatch } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import { addEntry } from '@/store/history';

import * as Styles from '@/Styles/Styles';
import TextButton from '@/Components/TextButton';
import CircularProgress from '@/Components/CircularProgress';

import {
    accel_isPointingUp,
    accel_isFlatDown,
    secondsToMinutesAndSeconds,
    minutesAndSecondsToSeconds,
    dateToDateData
} from "@/lib/utils";

import type { SitupsComponentProps } from '@/types/props';
import type { NewHistoryEntry } from '@/types/types';

import type { AccelerometerMeasurement } from 'expo-sensors';
import type { EventSubscription } from 'expo-modules-core';

// Uses the device's Accelerometer to measure device orientation to detect situps automatically
export default function SitupsComponent(props: SitupsComponentProps) {
    // Deconstruct props
    const { onSubmit } = props;

    // Get necessary state
    const dispatch = useAppDispatch();

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const textStyles = Styles.textStyles(themeColors);
    const textButtonProps = Styles.textButtonProps(themeColors);
    const circularProgressProps = Styles.circularProgressProps(themeColors);

    // State values used to for listening to accelerometer changes
    const [subscription, setSubscription] = useState<EventSubscription | null>(null);

    // State values used to configure the situps
    const [workoutType, setWorkoutType] = useState<"Count" | "Timer">("Count");
    const [workoutMessage, setWorkoutMessage] = useState<string>("Reach your target number of situps");
    const [canStartWorkout, setCanStarkWorkout] = useState<boolean>(false);
    const [startedWorkout, setStartedWorkout] = useState<boolean>(false);
    const [finishedWorkout, setFinishedWorkout] = useState<boolean>(false);

    // State values used to track the progress of the workout
    const [startedSitup, setStartedSitup] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null); // the interval timer
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [goal, setGoal] = useState<number>(15);
    const [goalString, setGoalString] = useState<string>(`${goal}`);

    // Error message (if any exists)
    const [error, setError] = useState<string>("");

    // Data state for the values of the accelerometer
    const [{ x, y, z }, setData] = useState<AccelerometerMeasurement>({ x: 0, y: 0, z: 0, timestamp: 0 });

    // Cycle through the workout types
    const toggleWorkoutType = () => {
        if (workoutType == "Count") {
            setWorkoutType("Timer");
        }
        if (workoutType == "Timer") {
            setWorkoutType("Count");
        }
    }

    // Start the workout
    const startWorkout = () => {
        // If the workout cannot be started, return and do nothing
        if (!canStartWorkout) return;

        // Set that the workout is started
        setStartedWorkout(true);

        // If the workout type is a timer, set the interval for the timer
        if (workoutType == "Timer") {
            const interval = setInterval(() => {
                setTimeElapsed((prevTimeElapsed) =>
                    prevTimeElapsed + 1);
            }, 1000);

            setTimer(interval);
        }
    }
    // Cancel the workout and reset progress
    const cancelWorkout = () => {
        stopWorkout();
        setCanStarkWorkout(false);
        setCount(0);
        setTimeElapsed(0);
    }
    // Finish the work and save progress
    const finishWorkout = () => {
        stopWorkout();
        setFinishedWorkout(true);
    }
    // Clean up values after the workout has stopped, regardless of if it has been cancelled or finished
    const stopWorkout = () => {
        if (timer) clearInterval(timer);
        setStartedWorkout(false);
    }
    // Reset all values and start again
    const resetWorkout = () => {
        if (timer) clearInterval(timer);
        setCanStarkWorkout(false);
        setStartedWorkout(false);
        setFinishedWorkout(false);
        setStartedSitup(false);
        setCount(0);
        setTimer(null);
        setTimeElapsed(0);
        setGoal(15);
        setGoalString(`${goal}`);
    }

    // When the goal string is changed from the text input
    const onGoalStringChange = (text: string) => {
        // Remove the error message if it was caused by this field
        setError("");

        // Set the goal string
        setGoalString(text);

        // Only allow numbers for Count workout type
        if (workoutType == "Count") {
            // If the input text contains only digits, try parsing the count number
            if (/^\d*$/.test(text)) {
                // Try parsing the count number
                const goalInt = parseInt(text);

                // If parsing failed, set the error message
                if (isNaN(goalInt) || goalInt <= 0) {
                    setError("Please enter a valid number");
                    return;
                }

                // If parsing succeeded, set the count number
                setGoal(goalInt);
            }
            // Otherwise set an error message
            else {
                setError("Please enter a valid number");
            }
        }
        // Only allow numbers and a colon for Timer workout type
        if (workoutType == "Timer") {
            // If the input text contains only digits, try parsing the count number
            if (/^\d+:\d\d$/.test(text)) {
                // Try parsing the count number
                const goalInt = minutesAndSecondsToSeconds(text);

                // If parsing failed, set the error message
                if (isNaN(goalInt) || goalInt <= 0) {
                    setError("Please enter a valid number");
                    return;
                }

                // If parsing succeeded, set the count number
                setGoal(goalInt);
            }
            // Otherwise set an error message
            else {
                setError("Please enter a valid number");
            }
        }
    };

    // Subscribe and unsubscribe to the Accelerometer
    useEffect(() => {
        const subscribe = () => {
            Accelerometer.setUpdateInterval(200);
            setSubscription(Accelerometer.addListener(setData));
        };
        const unsubscribe = () => {
            subscription && subscription.remove();
            setSubscription(null);
        };

        subscribe();
        return () => unsubscribe();
    }, []);

    // Check if the workout type has changed
    useEffect(() => {
        if (workoutType == "Count") {
            setWorkoutMessage("Reach your target number of situps");
            setGoal(15);
        }
        if (workoutType == "Timer") {
            setWorkoutMessage("Do as many situps as you can before the timer ends");
            setGoal(60);
        }
    }, [workoutType]);

    // Check if the goal has changed
    useEffect(() => {
        setError("");
        setGoalString(workoutType == "Timer" ? secondsToMinutesAndSeconds(`${goal}`) : `${goal}`);
        if (isNaN(goal) || goal <= 0) {
            setError("Please enter a valid number");
            return;
        }
    }, [goal]);

    // Check the device position for the workout status
    useEffect(() => {
        // If a workout has not started yet and the device is pointing up, a workout can be started
        if (!startedWorkout && accel_isPointingUp(x, y, z)) {
            setCanStarkWorkout(true);
        }
        // If a workout has not started yet and the device is not pointing up, a workout can't be started
        else if (!startedWorkout) {
            setCanStarkWorkout(false);
        }

        // If a workout has started and the device is laying flat down, a situp has started
        if (startedWorkout && accel_isFlatDown(x, y, z)) {
            setStartedSitup(true);
        }

        // If a workout has started and a situp has started and the device is pointing up, a situp has finished
        if (startedWorkout && startedSitup && accel_isPointingUp(x, y, z)) {
            setStartedSitup(false);
            setCount(count + 1);
        }
    }, [x, y, z])

    // Check if the count or timer has been reached
    useEffect(() => {
        if (startedWorkout && (count >= goal || timeElapsed >= goal)) {
            finishWorkout();
        }
    }, [count, timeElapsed]);

    // Submit the entry when the exercise is finished
    const submitEntry = () => {
        // Get the date data
        const date = dateToDateData(new Date());

        // Create the new entry if the values are valid
        const newEntry: NewHistoryEntry = {
            date: date.dateString,
            exercise: "Situps",
            count: count,
        };

        // Add the entry to the state
        dispatch(addEntry(newEntry));

        // If an on submit function exists, call it after submitting
        if (onSubmit) onSubmit();

        // Reset the workout
        resetWorkout();
    }

    return (
        <View style={{
            width: '100%',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            {/* Exercise type */}
            <View style={{
                width: '100%',
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
            }}>
                <Text style={[textStyles.mediumText]}>
                    Exercise Type
                </Text>
                <TouchableOpacity
                    onPress={toggleWorkoutType}
                    disabled={startedWorkout || finishedWorkout}
                    style={[{
                        flex: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }, startedWorkout || finishedWorkout ? { opacity: 0.75 } : {}]}
                >
                    <Text style={[textStyles.text, { paddingRight: 10 }]}>
                        {workoutType}
                    </Text>
                    <Image
                        tintColor={themeColors.primary}
                        style={{
                            height: 30,
                            width: 30,
                        }}
                        source={require('@/assets/icons/change.png')}
                    />
                </TouchableOpacity>
            </View>
            {/* Exercise setup OR circular progress bar */}
            <View style={{
                width: '100%',
                flex: 4,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* If the workout has started show the progress bar */}
                {(startedWorkout || finishedWorkout) &&
                    <View style={{
                        width: '100%',
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CircularProgress {...circularProgressProps} progress={workoutType == "Count" ? count : timeElapsed} maxProgress={goal} />
                        {/* Progress text */}
                        {!finishedWorkout &&
                            <Text style={[textStyles.mediumText, { marginTop: 40 }]}>
                                You have completed {count} situps so far.
                            </Text>
                        }
                        {/* Text telling user they finished the workout */}
                        {finishedWorkout &&
                            <Text style={[textStyles.mediumText, { marginTop: 40 }]}>
                                Finished! You completed {count} situps.
                            </Text>
                        }
                        {/* Text telling user to go up or down during the workout */}
                        {startedWorkout &&
                            <Text style={[textStyles.text, { marginTop: 40 }]}>
                                {startedSitup ? "Going up..." : "Going down..."}
                            </Text>
                        }
                    </View>
                }
                {/* If the workout hasn't started show the options */}
                {(!startedWorkout && !finishedWorkout) &&
                    <View
                        style={{
                            width: '100%',
                            flexGrow: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {/* Minus button */}
                            <TouchableOpacity
                                onPress={() => { setGoal(goal - 1) }}
                                style={goal > 1 ? {} : { opacity: 0.5 }}
                                disabled={goal <= 1}
                            >
                                <Image
                                    tintColor={themeColors.primary}
                                    source={require('@/assets/icons/minus.png')}
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }}
                                />
                            </TouchableOpacity>
                            {/* Goal */}
                            <TextInput
                                textAlign='center'
                                value={goalString}
                                returnKeyType='done'
                                onChangeText={onGoalStringChange}
                                style={[textStyles.mediumText, {
                                    textAlign: 'center',
                                    width: '60%',
                                    fontSize: 80,
                                    padding: 15,
                                }]}
                                placeholder={workoutType == "Count" ? "15" : "1:00"}
                                placeholderTextColor={themeColors.secondary}
                            />
                            {/* Plus button */}
                            <TouchableOpacity onPress={() => { setGoal(goal + 1) }}>
                                <Image
                                    tintColor={themeColors.primary}
                                    source={require('@/assets/icons/plus.png')}
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={textStyles.text}>
                            {workoutMessage}
                        </Text>
                    </View>
                }
            </View>
            {/* Start, cancel, and finish buttons */}
            <View style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginVertical: 25,
            }}>
                {/* Error message */}
                <Text style={[textStyles.text, { color: 'red', padding: 15 }]}>
                    {error}
                </Text>
                {/* Start button */}
                {!startedWorkout && !finishedWorkout &&
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}>
                        <Text style={[textStyles.text, canStartWorkout ? {} : { color: 'red' }]}>
                            Hold your device straight up and down to begin workout
                        </Text>
                        <TextButton
                            onPress={startWorkout}
                            {...textButtonProps}
                            style={[textButtonProps.style, (canStartWorkout && error == "") ? {} : { opacity: 0.75 }]}
                            textStyle={[textButtonProps.textStyle, (canStartWorkout && error == "") ? {} : { color: themeColors.secondary }]}
                            disabled={(!canStartWorkout || error != "")}
                        >
                            Start
                        </TextButton>
                    </View>
                }
                {/* Cancel and finish button */}
                {startedWorkout &&
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}>
                        <TextButton
                            onPress={cancelWorkout}
                            {...textButtonProps}
                            style={[textButtonProps.style, { width: '45%' }]}
                            textStyle={[textButtonProps.textStyle, { fontSize: 30 }]}
                        >
                            Cancel
                        </TextButton>
                        <TextButton
                            onPress={finishWorkout}
                            {...textButtonProps}
                            style={[textButtonProps.style, { width: '45%' }]}
                            textStyle={[textButtonProps.textStyle, { fontSize: 30 }]}
                        >
                            Finish
                        </TextButton>
                    </View>
                }
                {/* Submit button */}
                {finishedWorkout &&
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}>
                        <TextButton
                            onPress={resetWorkout}
                            {...textButtonProps}
                            style={[textButtonProps.style, { width: '45%' }]}
                            textStyle={[textButtonProps.textStyle, { fontSize: 30 }]}
                        >
                            Cancel
                        </TextButton>
                        <TextButton
                            onPress={submitEntry}
                            {...textButtonProps}
                            style={[textButtonProps.style, { width: '45%' }]}
                            textStyle={[textButtonProps.textStyle, { fontSize: 30 }]}
                        >
                            Submit
                        </TextButton>
                    </View>
                }
            </View>
        </View >
    );
};