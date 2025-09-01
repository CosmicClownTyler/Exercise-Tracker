import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import { selectPreferencesExercisesListView, selectPreferencesHistoryEntryFloatingButton } from '@/store/preferences';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import TextButton, { TextButtonSquare } from '@/Components/TextButton';
import ImageButton from '@/Components/ImageButton';
import SitupsComponent from '@/Components/Exercises/SitupsComponent';
import PushupsComponent from '@/Components/Exercises/PushupsComponent';
import PullupsComponent from '@/Components/Exercises/PullupsComponent';
import PlanksComponent from '@/Components/Exercises/PlanksComponent';
import SquatsComponent from '@/Components/Exercises/SquatsComponent';
import HistoryEntryComponent from '@/Components/HistoryEntryComponent';

import type { ExercisesStackParamList } from '@/types/types';
import type { ExercisesLandingProps, SitupsProps, PushupsProps, PullupsProps, PlanksProps, SquatsProps, HistoryEntryProps } from '@/types/props';

const ExercisesStack = createNativeStackNavigator<ExercisesStackParamList>();

export default function ExercisesScreen() {
    return (
        <ExercisesStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <ExercisesStack.Screen name='Landing' component={Landing} />
            <ExercisesStack.Screen name='Situps' component={Situps} />
            <ExercisesStack.Screen name='Pushups' component={Pushups} />
            <ExercisesStack.Screen name='Pullups' component={Pullups} />
            <ExercisesStack.Screen name='Planks' component={Planks} />
            <ExercisesStack.Screen name='Squats' component={Squats} />
            <ExercisesStack.Screen name='HistoryEntry' component={HistoryEntry} />
        </ExercisesStack.Navigator>
    );
};

function Landing({ navigation, route }: ExercisesLandingProps) {
    // Get necessary state
    const exercisesListView = useAppSelector(state => selectPreferencesExercisesListView(state));
    const historyEntryFloatingButton = useAppSelector(state => selectPreferencesHistoryEntryFloatingButton(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const textButtonProps = Styles.textButtonProps(themeColors);
    const imageButtonProps = Styles.imageButtonProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Exercises' {...headerProps} />
            {/* List View */}
            {exercisesListView &&
                <View style={{
                    width: '100%',
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('Situps'); }}>
                        Situps
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('Pushups'); }}>
                        Pushups
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('Pullups'); }}>
                        Pullups
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('Planks'); }}>
                        Planks
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('Squats'); }}>
                        Squats
                    </TextButton>
                    {/* Optional history entry fixed button */}
                    {!historyEntryFloatingButton &&
                        <TextButton {...textButtonProps} onPress={() => { navigation.navigate('HistoryEntry'); }}>
                            Manual
                        </TextButton>
                    }
                </View>
            }
            {/* Grid View */}
            {!exercisesListView &&
                <View style={{
                    width: '100%',
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('Situps'); }}>
                            Situps
                        </TextButtonSquare>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('Pushups'); }}>
                            Pushups
                        </TextButtonSquare>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('Pullups'); }}>
                            Pullups
                        </TextButtonSquare>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('Planks'); }}>
                            Planks
                        </TextButtonSquare>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('Squats'); }}>
                            Squats
                        </TextButtonSquare>
                        {/* Optional history entry fixed button */}
                        {!historyEntryFloatingButton &&
                            <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('HistoryEntry'); }}>
                                Manual
                            </TextButtonSquare>
                        }
                    </View>
                </View>
            }
            {/* Optional history entry floating button */}
            {historyEntryFloatingButton &&
                <View style={{
                    width: '100%',
                    alignItems: 'flex-end',
                }}>
                    <ImageButton
                        {...imageButtonProps}
                        src={require('@/assets/icons/plus.png')}
                        size={40}
                        onPress={() => { navigation.navigate('HistoryEntry'); }}
                    />
                </View>
            }
        </SafeAreaView>
    );
};

function Situps({ navigation, route }: SitupsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Situps' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <SitupsComponent onSubmit={() => { navigation.goBack(); navigation.getParent()?.navigate('History'); }} />
        </SafeAreaView>
    );
};
function Pushups({ navigation, route }: PushupsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Pushups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PushupsComponent />
        </SafeAreaView>
    );
};
function Pullups({ navigation, route }: PullupsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Pullups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PullupsComponent />
        </SafeAreaView>
    );
};
function Planks({ navigation, route }: PlanksProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Planks' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PlanksComponent />
        </SafeAreaView>
    );
};
function Squats({ navigation, route }: SquatsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Squats' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <SquatsComponent />
        </SafeAreaView>
    );
};
function HistoryEntry({ navigation, route }: HistoryEntryProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Manual Entry' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <HistoryEntryComponent onSubmit={() => { navigation.goBack(); navigation.getParent()?.navigate('History'); }} />
        </SafeAreaView>
    );
};