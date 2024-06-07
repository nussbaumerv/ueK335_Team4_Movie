import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        </Stack.Navigator>
    </NavigationContainer>
    )
    } 
 
    export default MainStackNavigator; 