import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from '../components/pages/HomePage';
import MoviesPage from '../components/pages/MoviesPage';

import ProfilePage from '../components/pages/ProfilePage';
import LoginForm from '../components/LoginForm';
import MovieDetail from '../components/MovieDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// User has to be logged in, if not directed to login page

 function Tabs() {
    return(
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Movies" component={MoviesPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="Login" component={LoginForm} />
        <Tab.Screen name="MovieDetail" component={MovieDetail} />
    </Tab.Navigator>
    );
    } 

    function MainStackNavigator() {
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Navbar" component={Tabs} />
        </Stack.Navigator>
    </NavigationContainer>
    )
    } 
 
    export default MainStackNavigator; 