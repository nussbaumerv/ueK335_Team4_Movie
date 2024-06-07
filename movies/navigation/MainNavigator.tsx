import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomePage from '../components/pages/HomePage';
import MoviesPage from '../components/pages/MoviesPage';
import ProfilePage from '../components/pages/ProfilePage';
import Register1Form from '../components/Register1Form';
import Register2Form from '../components/Register2Form';
import LoginForm from '../components/LoginForm';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// User has to be logged in, if not directed to login page

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Movies" component={MoviesPage} />
            <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    );
}

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Register1Form" component={Register1Form} />
                <Stack.Screen name="Register2Form" component={Register2Form} />
                <Stack.Screen name="LoginForm" component={LoginForm} />
                <Stack.Screen name="Navbar" component={Tabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator; 