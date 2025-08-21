import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text, AppState } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppSelector } from '@/hooks';

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
        <HomeStack.Navigator initialRouteName='Home2' screenOptions={{ headerShown: false }} >
            <HomeStack.Screen name='Home2' component={Home} />
            <HomeStack.Screen name='SitUps' component={SitUps} />
            <HomeStack.Screen name='PushUps' component={PushUps} />
            <HomeStack.Screen name='PullUps' component={PullUps} />
            <HomeStack.Screen name='Planks' component={Planks} />
        </HomeStack.Navigator>
    );
}

type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home2'>;
type SitUpsProps = NativeStackScreenProps<HomeStackParamList, 'SitUps'>;
type PushUpsProps = NativeStackScreenProps<HomeStackParamList, 'PushUps'>;
type PullUpsProps = NativeStackScreenProps<HomeStackParamList, 'PullUps'>;
type PlanksProps = NativeStackScreenProps<HomeStackParamList, 'Planks'>;

function Home({ navigation, route }: HomeProps) {
    const settings = useAppSelector(state => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);
    const textButtonProps = Styles.textButtonProps(settings);
    const scrollViewProps = Styles.scrollViewProps(settings);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={containerStyles.container}>
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
        </View>
    );
}

function SitUps({ navigation, route }: SitUpsProps) {
    const settings = useAppSelector(state => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={containerStyles.container}>
                <Header title='Sit Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
                <SitUpsComponent />
            </SafeAreaView>
        </View>
    );
}
function PushUps({ navigation, route }: PushUpsProps) {
    const settings = useAppSelector(state => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={containerStyles.container}>
                <Header title='Push Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
                <PushUpsComponent />
            </SafeAreaView>
        </View>
    );
}
function PullUps({ navigation, route }: PullUpsProps) {
    const settings = useAppSelector(state => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={containerStyles.container}>
                <Header title='Pull Ups' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
                <PullUpsComponent />
            </SafeAreaView>
        </View>
    );
}
function Planks({ navigation, route }: PlanksProps) {
    const settings = useAppSelector(state => state.settings);
    const containerStyles = Styles.containerStyles(settings);
    const headerProps = Styles.headerProps(settings);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={containerStyles.container}>
                <Header title='Planks' leftImage={require('@/assets/icons/arrow-left.png')} onLeft={navigation.goBack} {...headerProps} />
                <PlanksComponent />
            </SafeAreaView>
        </View>
    );
}