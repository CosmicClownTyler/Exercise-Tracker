import { StyleSheet, ScrollView, View, TouchableOpacity, Text, AppState } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColors } from '@/hooks';

import * as Styles from '@/Styles/Styles';
import Header from '@/Components/Header';
import TextButton from '@/Components/TextButton';
import { TextButtonSquare } from '@/Components/TextButton';

import SitUpsComponent from '@/Components/Exercises/SitUpsComponent';
import PushUpsComponent from '@/Components/Exercises/PushUpsComponent';
import PullUpsComponent from '@/Components/Exercises/PullUpsComponent';
import PlanksComponent from '@/Components/Exercises/PlanksComponent';

import { HomeStackParamList } from '@/types/types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeScreen() {
    return (
        <HomeStack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }} >
            <HomeStack.Screen name='Landing' component={Landing} />
            <HomeStack.Screen name='SitUps' component={SitUps} />
            <HomeStack.Screen name='PushUps' component={PushUps} />
            <HomeStack.Screen name='PullUps' component={PullUps} />
            <HomeStack.Screen name='Planks' component={Planks} />
        </HomeStack.Navigator>
    );
}

type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Landing'>;
type SitUpsProps = NativeStackScreenProps<HomeStackParamList, 'SitUps'>;
type PushUpsProps = NativeStackScreenProps<HomeStackParamList, 'PushUps'>;
type PullUpsProps = NativeStackScreenProps<HomeStackParamList, 'PullUps'>;
type PlanksProps = NativeStackScreenProps<HomeStackParamList, 'Planks'>;

function Landing({ navigation, route }: HomeProps) {
    const themeColors = useThemeColors();
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);
    const textButtonProps = Styles.textButtonProps(themeColors);
    const scrollViewProps = Styles.scrollViewProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Home' {...headerProps} />
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
        </SafeAreaView>
    );
}

function SitUps({ navigation, route }: SitUpsProps) {
    const themeColors = useThemeColors();
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Sit Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <SitUpsComponent />
        </SafeAreaView>
    );
}
function PushUps({ navigation, route }: PushUpsProps) {
    const themeColors = useThemeColors();
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Push Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PushUpsComponent />
        </SafeAreaView>
    );
}
function PullUps({ navigation, route }: PullUpsProps) {
    const themeColors = useThemeColors();
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Pull Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PullUpsComponent />
        </SafeAreaView>
    );
}
function Planks({ navigation, route }: PlanksProps) {
    const themeColors = useThemeColors();
    const containerStyles = Styles.containerStyles(themeColors);
    const headerProps = Styles.headerProps(themeColors);

    return (
        <SafeAreaView style={containerStyles.container} edges={['left', 'right', 'top']}>
            <Header title='Planks' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
            <PlanksComponent />
        </SafeAreaView>
    );
}