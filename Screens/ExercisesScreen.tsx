import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '@/hooks/hooks';
import { useThemeColors } from '@/hooks/theme';
import { selectPreferencesExercisesListView } from '@/store/preferences';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import TextButton, { TextButtonSquare } from '@/Components/TextButton';
import SitUpsComponent from '@/Components/Exercises/SitUpsComponent';
import PushUpsComponent from '@/Components/Exercises/PushUpsComponent';
import PullUpsComponent from '@/Components/Exercises/PullUpsComponent';
import PlanksComponent from '@/Components/Exercises/PlanksComponent';

import type { ExercisesStackParamList } from '@/types/types';
import type { ExercisesLandingProps, SitUpsProps, PushUpsProps, PullUpsProps, PlanksProps } from '@/types/props';

const ExercisesStack = createNativeStackNavigator<ExercisesStackParamList>();

export default function ExercisesScreen() {
    return (
        <ExercisesStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <ExercisesStack.Screen name='Landing' component={Landing} />
            <ExercisesStack.Screen name='SitUps' component={SitUps} />
            <ExercisesStack.Screen name='PushUps' component={PushUps} />
            <ExercisesStack.Screen name='PullUps' component={PullUps} />
            <ExercisesStack.Screen name='Planks' component={Planks} />
        </ExercisesStack.Navigator>
    );
};

function Landing({ navigation, route }: ExercisesLandingProps) {
    // Get necessary state
    const exercisesListView = useAppSelector(state => selectPreferencesExercisesListView(state));

    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const textButtonProps = Styles.textButtonProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Exercises' {...headerProps} />
            {exercisesListView &&
                <View style={{
                    width: '100%',
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('SitUps'); }}>
                        Sit Ups
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('PushUps'); }}>
                        Push Ups
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('PullUps'); }}>
                        Pull Ups
                    </TextButton>
                    <TextButton {...textButtonProps} onPress={() => { navigation.navigate('Planks'); }}>
                        Planks
                    </TextButton>
                </View>
            }
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
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('SitUps'); }}>
                            Sit Ups
                        </TextButtonSquare>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('PushUps'); }}>
                            Push Ups
                        </TextButtonSquare>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('PullUps'); }}>
                            Pull Ups
                        </TextButtonSquare>
                        <TextButtonSquare {...textButtonProps} onPress={() => { navigation.navigate('Planks'); }}>
                            Planks
                        </TextButtonSquare>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};

function SitUps({ navigation, route }: SitUpsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Sit Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <SitUpsComponent />
        </SafeAreaView>
    );
};
function PushUps({ navigation, route }: PushUpsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Push Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PushUpsComponent />
        </SafeAreaView>
    );
};
function PullUps({ navigation, route }: PullUpsProps) {
    // Use the theme colors
    const themeColors = useThemeColors();

    // Get the styles and props needed for the components
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Pull Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PullUpsComponent />
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