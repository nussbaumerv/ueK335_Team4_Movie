import React from 'react';
import { View, StyleSheet } from 'react-native';
import MoviesStackNavigator from './MoviesStackNavigator';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../components/pages/HomePage';
import MoviesPage from '../components/pages/MoviesPage';
import ProfilePage from '../components/pages/ProfilePage';
import Register1Page from '../components/pages/Register1Page';
import Register2Page from '../components/pages/Register2Page';
import LoginPage from '../components/pages/LoginPage';
import EasterEgg from '../components/pages/EasterEgg';
import LogoutPage from '../components/pages/LogoutPage';
import MovieAdd from '../components/pages/MovieAdd';
import MovieDetail from '../components/MovieDetail';
import { DarkScheme } from '../components/theme/DarkScheme';
import MovieEdit from '../components/pages/MovieEdit';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesStackNavigator}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="movie-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-cog-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register1" component={Register1Page} />
        <Stack.Screen name="Register2" component={Register2Page} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="MovieAdd" component={MovieAdd} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
        <Stack.Screen name="EasterEgg" component={EasterEgg} />
        <Stack.Screen name="Logout" component={LogoutPage} options={{ headerShown: false, gestureEnabled: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}





