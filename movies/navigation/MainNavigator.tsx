import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesStackNavigator from './MoviesStackNavigator';

import HomePage from '../components/pages/HomePage';
import MoviesPage from '../components/pages/MoviesPage';

import ProfilePage from '../components/pages/ProfilePage';
import LoginForm from '../components/LoginForm';
import MovieDetail from '../components/MovieDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

 function Tabs() {
    return(
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Movies" component={MoviesStackNavigator} />
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="Login" component={LoginForm} />
    </Tab.Navigator>
    );
    } 

    function MainStackNavigator() {
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Navbar" component={Tabs} />
            <Stack.Screen name='MovieDetail' component={MovieDetail} />
        </Stack.Navigator>
    </NavigationContainer>
    )
    } 
 
    export default MainStackNavigator; 