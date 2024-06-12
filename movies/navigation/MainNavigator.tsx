import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from '../components/pages/HomePage';
import MoviesPage from '../components/pages/MoviesPage';
import ProfilePage from '../components/pages/ProfilePage';
import LoginPage from '../components/LoginForm';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// User has to be logged in, if not directed to login page

 function Tabs() {
    return(
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Movies" component={MoviesPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
    );
    } 

    function MainStackNavigator() {
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Navbar" component={Tabs} />
            <Stack.Screen name="Movies" component={MoviesPage} />
            <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
    </NavigationContainer>
    )
    } 
 
    export default MainStackNavigator; 